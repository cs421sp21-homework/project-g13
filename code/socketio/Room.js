var axios = require("axios");

async function getRestaurants(location) {
    try {
        const response = await axios.get(
            `https://chicken-tinder-13-backend.herokuapp.com/yelpsearch?query=${location}`);
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

        //number of people inside
        this.size = size;

        //stores votes for restaurants
        this.restaurantVotes = new Map();

        //stores restaurants
        this.restaurants = [];

        //is ready when everyone connected has restaurant data
        this.ready = false;

        //users who received restaurant data
        this.received = 0;

        //maximum number of restaurants
        this.limit = 20;
    }
    static emitReadySignalFunc;
    static emitRestaurantsFunc;

    setLocation(location) {
        if (location !== undefined && location !== "") {
            this.location = location;
            this.received = 0;
            //console.log(this.name ) 
            this.retreiveRestaurants();
        }
    }

    //return true if we need to send restaurant data to client
    addMember() {
        this.size++;
        if (this.received < this.size) {
            this.ready = false;
            if (this.restaurants.length > 0) {
                //send restaurant data to client
                return true;
            }
        }
    }

    memberLeft() {
        this.size--;
        if (this.received >= this.size) {
            this.ready = true;
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

    receivedRestaurantData() {
        this.received++;
        //console
        if (this.received >= this.size) {
            this.ready = true;
            Room.emitReadySignalFunc(this.name);
        }
    }

    async retreiveRestaurants() {
        if (this.restaurants.length < this.limit && this.location !== undefined && this.location !== "") {
            const response = await getRestaurants(this.location);
            if (response.length !== 0) {
                this.restaurants.push(...response);
                Room.emitRestaurantsFunc(this.name, JSON.stringify(this.restaurants));
            }
        }
    }

    getRestaurants() {
        return this.restaurants;
    }

    addEventListener(name, listener) {
        addEventListener(name, listener, false);
    }

    static set_emitReadySignalFunc(func) {
        Room.emitReadySignalFunc = func;
    }
}

module.exports = Room;