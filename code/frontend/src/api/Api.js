import axios from "axios";
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
        return response.data;
    } catch(err) {
        return ["err"];
    }
}

export {getRestaurants};
