var axios = require("axios");

const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com"
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};


async function getRestaurants(location, radius) {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/yelpsearch?query=${location}&radius=${radius}`
        );
        console.log("response");
        console.log(response);
        return response.data;
    } catch(err) {
        return ["err"];
    }
}

class Room {
    //Need to store restaurants, location, and likes/dislikes
    constructor(name, size) {
        //room name
        this.name = name;

        //the host's location
        this.location = "";

        this.radius = 20000;

        //number of people inside
        this.size = size;

        //stores votes for restaurants
        this.restaurantVotes = new Map();

        //stores restaurants
        this.restaurants = [];

        //is ready when everyone connected has restaurant data
        this.ready = false;

        //map of member id to ready status
        this.members = new Map();

        //maximum number of restaurants
        this.limit = 20;

        //did the group start the swiping event
        this.started = false;
    }
    static emitReadySignalFunc;
    static emitRestaurantsFunc;
    static emitFinishedFunc;
    static emitMatchFoundfunc;

    setLocation(location, radius) {
        if (location !== undefined && location !== "") {
            this.restaurants = [];
            this.location = location
            this.radius = radius * 1609.34;
            this.received = 0;
            //console.log(this.name ) 
            this.retreiveRestaurants();
        }
    }

    //return true if we need to send restaurant data to client
    addMember(memberId) {
        this.size++;
        this.members.set(memberId, {hasRestaurantData: false, finished: false});
        //emit not ready signal to room
        Room.emitReadySignalFunc(this.name, false);

        if (this.restaurants.length > 0) {
            //send restaurant data to client
            return true;
        }
    }

    memberLeft(memberId) {
        this.size--;
        if (this.members.has(memberId)) {
            this.members.delete(memberId);
            if (this.checkIfEveryMemberIsReady()) {
                Room.emitReadySignalFunc(this.name, true);
            }
            if (this.checkIfEveryMemberIsFinished()) {
                Room.emitFinishedFunc(this.name);
            }
        }
    }

    addVote(restaurantId) {
        var votes = 1;
        if ((restaurantId !== null && restaurantId !== "")) {
            if (this.restaurantVotes.has(restaurantId)) {
                votes = this.restaurantVotes.get(restaurantId);
                votes++;
            }
            this.restaurantVotes.set(restaurantId, votes);
            
            if (votes >= this.size) {
                return true;
            }
        }
        return false;
    }

    receivedRestaurantData(memberId) {
        if (this.members.has(memberId)) {
            this.members.get(memberId).hasRestaurantData = true;
            console.log(this.members.get(memberId).hasRestaurantData);
            if (this.checkIfEveryMemberIsReady() === true) {
                Room.emitReadySignalFunc(this.name, true);
            }
        }
    }

    memberFinished(memberId) {
        if (this.members.has(memberId)) {
            this.members.get(memberId).finished = true;
            if (this.checkIfEveryMemberIsFinished() === true) {
                if (this.checkIfMatchFound() === false) {
                    Room.emitFinishedFunc(this.name);
                }
            }
        }
    }

    async retreiveRestaurants() {
        console.log("retreiving restaurants...");
        console.log(this);
        if (this.restaurants.length < this.limit && this.location !== undefined && this.location !== "") {
            //console.log("here");
            //console.log(this.radius);
            const response = await getRestaurants(this.location, this.radius);
            //console.log(response);
            if (response.length !== 0) {
                //console.log("here2");
                this.restaurants.push(...response);
                Room.emitRestaurantsFunc(this.name, JSON.stringify(this.restaurants));
            }
        }
    }

    getRestaurants() {
        return this.restaurants;
    }

    static set_emitReadySignalFunc(func) {
        Room.emitReadySignalFunc = func;
    }

    checkIfEveryMemberIsReady() {
        for (const entry of this.members.entries()) {
            //console.log("member " + key + ": " + value.hasRestaurantData);
            if (entry[1].hasRestaurantData === false) {
                return false;
            }
        }
        return true;
    }

    checkIfEveryMemberIsFinished() {
       for (const entry of this.members.entries()) {
            //console.log("member " + key + ": " + value.finished);
            if (entry[1].finished === false) {
                return false;
            }
       }
        return true;
    }

    checkIfMatchFound() {
        for (const entry of this.restaurantVotes.entries()) {
            //console.log("member " + key + ": " + value.finished);
            if (entry[1] >= this.size) {
                //send the match found signal
                Room.emitMatchFoundfunc(this.name, entry[0])
                return true;
            }
        }
        return false;
    }
}

module.exports = Room;