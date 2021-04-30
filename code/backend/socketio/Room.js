//import * as rec from "./Recommend.js";
var rec = require("./Recommend");
var axios = require("axios");
const { setTheUsername } = require("whatwg-url");

const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getRestaurants(location, radius, offset, cancelTokenSource) {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/yelpsearch?query=${location}&radius=${radius}&offset=${offset}`,
            {
                cancelToken: cancelTokenSource.token,
            }
        );
        //console.log("response");
        //console.log(response);
        return response.data;
    } catch(err) {
        return ["err"];
    }
} 

async function getRestaurantsFilters(location, radius, offset, price, categories, cancelTokenSource) {
    try {
        const response = await axios.get(
            //`${BACKEND_URL}/yelpsearch?query=${location}&radius=${radius}`
            `${BACKEND_URL}/yelpsearch_personal?query=${location}&radius=${radius}&offset=${offset}&price=${price}&categories=${categories}`,
            {
                cancelToken: cancelTokenSource.token,
            }
        );
        //console.log("response");
        //console.log(response);
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

    //default radius
    this.radius = 20000;

    //the host's preferences
    this.categories = "";

    //the host's preferred price ($ -> 1 for API)
    this.price = "";

    //host's preferred ratings
    this.ratings = [];

    //number of people inside
    this.size = size;

    //stores yes votes for restaurants
    this.restaurantYesVotes = new Map();

    //stores no votes for restaurants
    this.restaurantNoVotes = new Map();

    //for convenience in looking up restaurant data
    this.restaurantById = new Map();

    //stores restaurants
    this.restaurants = [];

    //is ready when everyone connected has restaurant data
    this.ready = false;

    //map of member id to ready status
    this.members = new Map();

    //maximum number of restaurants
    this.limit = 20;

    //how many times you've tried again
    this.offset = 0;

    //did the group start the swiping event
    this.started = false;

    //async requests
    this.currentRequestId = 0;

    //cancellation tokens
    this.cancelationTokens = [];
    }
    static emitReadySignalFunc;
    static emitRestaurantsFunc;
    static emitFinishedFunc;
    static emitMatchFoundfunc;

    setLocation(location, radius, offset) {
        if (location !== undefined && location !== "") {
            this.restaurants = [];
            this.location = location
            this.radius = radius * 1609.34;
            this.offset = offset;
            this.received = 0;
            //console.log(this.name ) 
            this.ready = false;
            Room.emitReadySignalFunc(this.name, false);
            this.retrieveRestaurants().then(() => {
                this.initializeZeroVotes();
            });
        }
    }

    setFilters(price, categories, ratings) {
        console.log("price");
        console.log(price);
        console.log("categories");
        console.log(categories);
        var properPrice = "";
        if (price !== undefined && price.length !== 0) {
            // some fixing to allow for proper format for Yelp API (convert to string)
            for (let index = 0; index < price.length; index++) {
                if (price[index] === "$") {
                    properPrice = properPrice.concat("1,");
                } else if (price[index] === "$$") {
                    properPrice = properPrice.concat("2,");
                } else if (price[index] === "$$$") {
                    properPrice = properPrice.concat("3,");
                } else if (price[index] === "$$$$") {
                    properPrice = properPrice.concat("4,");
                }
            }
            this.price = properPrice.slice(0, -1);
            //console.log(this.name ) 
            //this.retreiveRestaurants();
        } else if (price == undefined || price.length === 0) {
            this.price = "";
        }

        var properCategories = "";
        if (categories !== undefined && categories.length !== 0) {
            // some fixing to allow for proper format for Yelp API (convert to string)
            for (let index = 0; index < categories.length; index++) {
                properCategories = properCategories.concat(categories[index]);
                if (index < categories.length - 1) {
                    properCategories = properCategories + ",";
                }
            }
            this.categories = properCategories;
        } else if (categories == undefined || categories.length === 0) {
            this.categories = "";
        }
        
        console.log("Categories");
        console.log(this.categories);

        if (ratings != undefined) {
            this.ratings = ratings;
        }

        this.restaurants = [];
        this.received = 0;
        this.retrieveRestaurants().then(() => {
            this.initializeZeroVotes();
        });
    }

  //return true if we need to send restaurant data to client
  addMember(memberId, memberName) {
    this.size++;
    this.members.set(memberId, {
      hasRestaurantData: false,
      finished: false,
      votes: new Map(),
      name: memberName,
    });
    
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
      //update restaurantYes/NoVotes
      for (let i = 0; i < this.restaurants.length; i++) {
        if (this.members.get(memberId).votes.has(this.restaurants[i].id)) {
          if (this.members.get(memberId).votes.get(this.restaurants[i].id)) {
            console.log("decreasing yes vote for " + this.restaurants[i].id);
            this.restaurantYesVotes.set(this.restaurants[i].id,
              this.restaurantYesVotes.get(this.restaurants[i].id) - 1);
          } else {
            this.restaurantNoVotes.set(this.restaurants[i].id,
              this.restaurantNoVotes.get(this.restaurants[i].id) - 1);
          }
        }
      }
      this.members.delete(memberId);
      if (this.checkIfEveryMemberIsReady()) {
        Room.emitReadySignalFunc(this.name, true);
      }
      if (this.checkIfEveryMemberIsFinished()) {
        Room.emitFinishedFunc(this.name);
      }
    }
    this.checkIfMatchFound();
  }

  addYesVote(restaurantId, member) {
    console.log("adding yes vote to " + restaurantId);
    if (this.members.has(member)) {
      this.members.get(member).votes.set(restaurantId, true);
    }
    let votes = 1;
    if (restaurantId !== null && restaurantId !== "") {
      if (this.restaurantYesVotes.has(restaurantId)) {
        votes = this.restaurantYesVotes.get(restaurantId);
        votes++;
      }
      this.restaurantYesVotes.set(restaurantId, votes);
      if (votes >= this.size) {
        return true;
      }
    }
    return false;
  }

  addNoVote(restaurantId, member) {
    if (this.members.has(member)) {
      this.members.get(member).votes.set(restaurantId, false);
    }
    let votes = 1;
    if (restaurantId !== null && restaurantId !== "") {
      if (this.restaurantNoVotes.has(restaurantId)) {
        votes = this.restaurantNoVotes.get(restaurantId);
        votes++;
      }
      this.restaurantNoVotes.set(restaurantId, votes);
    }
  }

  receivedRestaurantData(memberId) {
    if (this.members.has(memberId)) {
      this.members.get(memberId).finished = false;
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

    async retrieveRestaurants() {
        if (this.location !== undefined && this.location !== "") {
            //check if prices and categories are not zero-length
            var response = null;
            this.currentRequestId++;
            const requestId = this.currentRequestId;
            const cancelToken = axios.CancelToken.source();
            this.cancelationTokens.push(cancelToken);
            if (this.cancelationTokens.length > 1) {
                var splice = this.cancelationTokens.splice(0, this.cancelationTokens.length - 1);
                for (let i=0; i<splice.length; i++) {
                    console.log("request canceled");
                    splice[i].cancel();
                }
            }

            //console.log(this);
            if (this.price.length !== 0 || this.categories.length !== 0 || this.ratings.length !== 0) {
                response = await this.retreiveRestaurantsWithFilters(cancelToken);
            } else {
                response = await this.retreiveRestaurantsNoFilters(cancelToken);
            }

            //console.log("response: ");
            //console.log(response);
            if (this.currentRequestId === requestId) {
                this.restaurants.push(...response);
                Room.emitRestaurantsFunc(this.name, JSON.stringify(this.restaurants));
            }
        }
    }

    async retreiveRestaurantsNoFilters(cancelTokenSource) {
        console.log("retreiving restaurants with no filters...");
        //console.log(this);
        if (this.restaurants.length < this.limit && this.location !== undefined && this.location !== "") {
            return await getRestaurants(this.location, this.radius, this.offset, cancelTokenSource);
        }
        return [];
    }

    async retreiveRestaurantsWithFilters(cancelTokenSource) {
        console.log("retreiving restaurants with filters...");
        //console.log(this);
        if (this.restaurants.length < this.limit && this.location !== undefined && this.location !== "") {
            //console.log("here");
            //console.log(this.radius);
            var response = await getRestaurantsFilters(this.location, this.radius, this.offset, this.price, this.categories, cancelTokenSource);
                console.log(response);
                this.filterRestaurants(response);
                return response;
            
        }
        return [];
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
    for (let i = this.offset; i < this.restaurants.length; i++) {
      if (this.restaurantYesVotes.get(this.restaurants[i].id) >= this.size) {
        //send the match found signal
        Room.emitMatchFoundfunc(this.name, this.restaurants[i].id);
        return true;
      }
    }
    return false;
  }

  initializeZeroVotes() {
    for (let i = 0; i < this.restaurants.length; i++) {
      if (!this.restaurantYesVotes.has(this.restaurants[i].id)) {
        console.log("set yes votes for " + this.restaurants[i].id +" to 0");
        this.restaurantYesVotes.set(this.restaurants[i].id, 0);
      }
      if (!this.restaurantNoVotes.has(this.restaurants[i].id)) {
        this.restaurantNoVotes.set(this.restaurants[i].id, 0);
      }
    }
  }

  updateRestaurantsArray(member, restaurants) {
    return rec.reorderArray(
      restaurants,
      member.votes,
      this.restaurantById,
      this.restaurantYesVotes,
      this.restaurantNoVotes
    );
  }

  getRec() {
    for (let i = 0; i < this.restaurants.length; i++) {
      this.restaurantById.set(this.restaurants[i].id, this.restaurants[i]);
    }
    const restaurantId = rec.recommendRestaurant(
      this.members,
      this.restaurantYesVotes,
      this.restaurantNoVotes,
      this.restaurantById
    )[0];
    return this.restaurantById.get(restaurantId);
  }

  getTopVotes() {
    var topChoices = new Map();
    for (let i = 0; i < this.restaurants.length; i++) {
      let id = this.restaurants[i].id;
      let votes = this.restaurantYesVotes.get(id);
      if ((votes/this.size) >= 0.5) {
        topChoices.set(this.restaurantById.get(id), votes);
      }
    }
    var sorted = new Map([...topChoices.entries()].sort((a,b)=> b[1] - a[1]));
    console.log(sorted);
    let resArr = new Array();
    let votesArr= new Array();
    for(const entry of sorted.entries()) {
      resArr.push(entry[0]);
      votesArr.push(entry[1]);
    }
    return {restaurants: resArr, votes: votesArr}
  }

    filterRestaurants(restaurants) {
        if (this.ratings.length > 0) {
            for (let i=0; i<restaurants.length; i++) {
                const restaurant = restaurants[i];
                var fits = false;
                for (let j=0; j<this.ratings.length; j++) {
                    const desiredRating = this.ratings[j];
                    console.log("desired rating: " + desiredRating);
                    if (restaurant.rating >= desiredRating && restaurant.rating < desiredRating + 1) {
                        console.log("index: " + i); 
                        fits = true;
                        break;
                    }
                }

                if (fits === false) {
                    restaurants.splice(i, 1);
                    i--;
                }
            }
        }
    }

    getMemberNames() {
      let memberNames = [];
      this.members.forEach((value) => {
        memberNames.push(value.name);
      });
      return memberNames;
    }
}

module.exports = Room;
