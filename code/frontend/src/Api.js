import axios from "axios";
const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com"

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

async function postGroup() {
    const response = await axios.post(`${BACKEND_URL}/api/groups`);
    return response.data;
}

async function postUser(uname, pwd, loc, groupid) {
    const response = await(axios.post(`${BACKEND_URL}/api/users`,
        {
            loc: loc,
            userName: uname,
            pword: pwd,
            group_ID: groupid,
        }
        ));
    return response.data;
}

async function getGroupMembers(groupid) {
    const response = await(axios.get(`${BACKEND_URL}/api/groups/${groupid}`));
    return response.data;
}

export {getRestaurants, postGroup, postUser, getGroupMembers};
