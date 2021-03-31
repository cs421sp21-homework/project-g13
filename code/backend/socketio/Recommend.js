/*
users is a map of objects with a field called votes.
if a user's id is 555 and they voted yes on restaurant with id 123,
users.get(555).votes.get(123) = true.

if a restaurant's id is 123 and the group has voted
yes on it once and no on it twice, yesVotes.get('123') = 1,
noVotes.get('123') = 2, and restaurants.get('123') returns the
full restaurant object.
 */
function recommendRestaurant(users, yesVotes, noVotes, restaurants) {
    //todo implement
    return 0;
}

//userVotes: Map restaurant id -> boolean
//restaurantArray: simple array[] of restaurant objects
//restaurantsById: Map restaurant id -> full restaurant object
//keep in mind the user's position (size of userVotes)
function reorderArray(restaurantArray, userVotes, restaurantsById) {
    //todo implement
    return restaurantArray;
}



//returns a map of the % of yes votes by category
function getAllCategoryPcts(yesVotes, noVotes, restaurants) {
    let pcts = new Map();
    for (const entry of restaurants.entries()) {
        for (const cat of entry[1].categories) {
            if (!pcts.has(cat.title)) {
                pcts.set(cat.title, getCategoryPct(cat.title, yesVotes,
                    noVotes, restaurants));
            }
        }
    }
    return pcts;
}


function getCategoryPct(category, yesVotes, noVotes, restaurants) {
    let negVotes = 0;
    let posVotes = 0;
    for (const entry of restaurants.entries()) {
        for (const cat of entry[1].categories) {
            if (cat.title === category) {
                negVotes += noVotes.get(entry[0]);
                posVotes += yesVotes.get(entry[0]);
            }
        }
    }
    return (posVotes === 0 ? 0 : posVotes / (posVotes + negVotes));
}

export {recommendRestaurant, reorderArray};