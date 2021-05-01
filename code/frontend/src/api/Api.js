import axios from "axios";
const BACKEND_URL = "https://chicken-tinder-13-backend.herokuapp.com"
const localURL = "http://localhost:4568";
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Request-Headers": "*",
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

async function getRestaurantsFilters(location, radius, price, categories) {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/yelpsearch_personal?query=${location}&radius=${radius}&price=${price}&categories=${categories}`
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

async function getUserPreference(username) {
    const response = await axios.get(`${BACKEND_URL}/api/users/${username}`);
    return response.data.preferencesList;
}

async function updatePreference(username, preference) {
    let data = JSON.stringify({
        "username": username,
        "preferencesList": preference
      });
    
    const config = {
        method: 'put',
        url: `${BACKEND_URL}/updatePreference`,
        data : JSON.stringify({
            "username" : username,
            "preferencesList": preference,
        }),
    };
   
    const response = await axios(config);
    return response.data;
}

async function login(username, password) {
    const data = JSON.stringify({
        "username": username,
        "password": password
    });

    const config = {
        method: 'post',
        url: `${BACKEND_URL}/login`,
        headers: {
            //'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios(config);
    return response.data;
}

async function signup(username, password) {
    const data = JSON.stringify({
        "username": username,
        "password": password
    });

    const config = {
        method: 'post',
        url: `${BACKEND_URL}/signup`,
        headers: {
            //'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios(config);
    return response.data;
}

async function isLoggedIn(username) {
    const data = JSON.stringify({
        "username": username,
    });

    const config = {
        method: 'post',
        url: `${BACKEND_URL}/isLoggedIn`,
        headers: {
            //'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch(e) {
        return {message: "failure"};
    }
}

async function logout(username) {
    const data = JSON.stringify({
        "username": username,
    });

    const config = {
        method: 'post',
        url: `${BACKEND_URL}/logout`,
        headers: {
            //'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios(config);
    return response.data;
}

async function getLocation(username) {
  
    const config = {
        method: 'get',
        url: `${BACKEND_URL}/api/location/${username}`
    };

    const response = await axios(config);
    return response.data.message;
}

async function setLocation(username, location) {
    
    const data = JSON.stringify({
        "location": location,
    });

    const config = {
        method: 'post',
        url: `${BACKEND_URL}/api/location/${username}`,
        data: data
    };

    const response = await axios(config);
    return response.data.message; // should be location from parameter
}

export {getRestaurants, getRestaurantsFilters, postGroup, postUser, getGroupMembers, getUserPreference, 
    updatePreference, login, signup, isLoggedIn, logout, setLocation, getLocation};
