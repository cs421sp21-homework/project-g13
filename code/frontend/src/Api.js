import axios from "axios";
async function getRestaurants() {
    const response = axios.get('http://chicken-tinder-13-backend.herokuapp.com/hello-world-onlybackend');
    return response;
}

export {getRestaurants};
