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

async function postGroup() {
    const response = await axios.post(`${BACKEND_URL}/api/groups`);
    return response.data;
}

async function postUser(uname, pwd, loc, groupid) {
    const data = JSON.stringify({
        "userName": uname,
        "pword": pwd,
        "loc": loc,
        "group_ID": groupid
    });

    const config = {
        method: 'post',
        url: 'https://chicken-tinder-13-backend.herokuapp.com/api/users',
        data : data
    };

    const response = await axios(config);
    return response.data;
}

async function getGroupMembers(groupid) {
    const response = await(axios.get(`${BACKEND_URL}/api/groups/${groupid}`));
    return response.data;
}

export {getRestaurants, postGroup, postUser, getGroupMembers};
