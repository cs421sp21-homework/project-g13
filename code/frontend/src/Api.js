import axios from "axios";
async function getRestaurants(location) {
    console.log(location);
    try {
        const response = await axios.get(
            `https://chicken-tinder-13-backend.herokuapp.com/search?query=${location}`);
        return response.data.restaurants;
    } catch(err) {
        console.log("err");
        return ["err"];
    }
}

export {getRestaurants};
