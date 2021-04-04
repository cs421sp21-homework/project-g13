//import * as rec from "./Recommend.js";
var rec = require("./Recommend");
var axios = require("axios");

const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getRestaurants(location, radius) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/yelpsearch?query=${location}&radius=${radius}`
    );
    console.log("response");
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
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

    //did the group start the swiping event
    this.started = false;
  }
  static emitReadySignalFunc;
  static emitRestaurantsFunc;
  static emitFinishedFunc;
  static emitMatchFoundfunc;
  static emitRecommendFunc;

  setLocation(location, radius) {
    if (location !== undefined && location !== "") {
      this.restaurants = [];
      this.location = location;
      this.radius = radius * 1609.34;
      this.received = 0;
      //console.log(this.name )
      this.retreiveRestaurants();
    }
  }

  //return true if we need to send restaurant data to client
  addMember(memberId) {
    this.size++;
    this.members.set(memberId, {
      hasRestaurantData: false,
      finished: false,
      votes: new Map(),
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
      this.members.delete(memberId);
      if (this.checkIfEveryMemberIsReady()) {
        Room.emitReadySignalFunc(this.name, true);
      }
      if (this.checkIfEveryMemberIsFinished()) {
        Room.emitFinishedFunc(this.name);
      }
    }
  }

  addYesVote(restaurantId, member) {
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
    if (
      this.restaurants.length < this.limit &&
      this.location !== undefined &&
      this.location !== ""
    ) {
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
    for (const entry of this.restaurantYesVotes.entries()) {
      //console.log("member " + key + ": " + value.finished);
      if (entry[1] >= this.size) {
        //send the match found signal
        Room.emitMatchFoundfunc(this.name, entry[0]);
        return true;
      }
    }
    return false;
  }

  initializeZeroVotes() {
    for (let i = 0; i < this.restaurants.length; i++) {
      if (!this.restaurantYesVotes.has(this.restaurants[i].id)) {
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
    this.initializeZeroVotes();
    const restaurantId = rec.recommendRestaurant(
      this.members,
      this.restaurantYesVotes,
      this.restaurantNoVotes,
      this.restaurantById
    );
    return restaurantId;
  }

  getTopVotes() {
    var topChoices = new Map();
    for (let i = 0; i < this.restaurants.length; i++) {
      let id = this.restaurants[i].id;
      let votes = this.restaurantYesVotes.get(id);
      if (votes/this.size >= 0.5) {
        topChoices.set(id, votes);
      }
    }
    var sorted = new Map([...topChoices.entries()].sort((a,b)=> b[1] - a[1]));
    console.log(sorted);
    return sorted
  }
}

module.exports = Room;
