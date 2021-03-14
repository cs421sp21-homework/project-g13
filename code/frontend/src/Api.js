import axios from "axios";
const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com"

async function getRestaurants(location, radius) {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/search?query=${location}&radius=${radius}`
        );
        return response.data;
    } catch(err) {
        return ["err"];
    }
}

export {getRestaurants};
