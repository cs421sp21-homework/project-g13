let stringSimilarity = require("string-similarity");
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
  let catMap = new Map();
  let ratMap = new Map();
  let priceMap = new Map();
  Object.keys(restaurants).map(function (key, index) {
    let restaurantObj = restaurants.get(key);
    let rId = restaurantObj["id"];
    let rCategories = restaurantObj["categories"];
    for (let i = 0; i < rCategories.length; i++) {
      rCategories[i] = rCategories[i]["alias"];
    }
    let rRating = Math.floor(parseInt(restaurantObj["rating"]));
    let rPrice = restaurantObj["price"];
    if (rPrice === undefined) {
      rPrice = "$";
    }
    let rWeight = yesVotes.get(rId) - noVotes.get(rId);
    for (let j = 0; j < rCategories.length; j++) {
      if (rCategories[j] !== undefined) {
        if (catMap[rCategories[j]] === undefined) {
          catMap[rCategories[j]] = 0;
        }
        catMap[rCategories[j]] = catMap[rCategories[j]] + rWeight;
      }
    }

    if (ratMap[rRating] === undefined) {
      ratMap[rRating] = 0;
    }
    ratMap[rRating] = ratMap[rRating] + rWeight;

    if (priceMap[rPrice] === undefined) {
      priceMap[rPrice] = 0;
    }
    priceMap[rPrice] = priceMap[rPrice] + rWeight;
  });

  //Retrive top 3 categories from users
  let catSorted = Object.keys(catMap).sort((a, b) => catMap[b] - catMap[a]);
  let categoryProfile = catSorted.slice(0, 3);

  // Retrive the best rating
  let ratSorted = Object.keys(ratMap).sort((a, b) => ratMap[b] - ratMap[a]);
  let ratingProfile = ratSorted.slice(0, 1);

  // Retrieve the best price
  let priceSorted = Object.keys(priceMap).sort(
    (a, b) => priceMap[b] - priceMap[a]
  );
  let priceProfile = priceSorted.slice(0, 1);

  // Compute similarity score for each restaurant

  let idMap = new Map(); //keep track of similarity score for each restaurant, highest score gets returned!

  const catPoints = 10; // each similary category = 10 points
  const pricePoints = 5; // similar price range = 5 points
  const ratPoints = 3; // similar rating area = 3 points
  Object.keys(restaurants).map(function (key, index) {
    if (idMap[key] === undefined) {
      idMap[key] = 0;
    }

    let tempRest = restaurants.get(key);
    let tempCategories = restaurants.get(key)["categories"];
    for (let i = 0; i < rCategories.length; i++) {
      tempCategories[i] = tempCategories[i]["alias"];
    }

    for (let i = 0; i < categoryProfile.length; i++) {
      for (let j = 0; j < tempCategories.length; j++) {
        idMap[key] +=
          catPoints *
          stringSimilarity.compareTwoStrings(
            categoryProfile[i],
            tempCategories[j]
          );
      }
    }

    if (tempRest["price"] === priceProfile[0]) {
      idMap[key] += pricePoints;
    }
    if (
      Math.floor(parseInt(tempRest["rating"])) ===
      Math.floor(parseInt(ratingProfile[0]))
    ) {
      idMap[key] += ratPoints;
    }
  });
  let idSorted = Object.keys(idMap).sort((a, b) => idMap[b] - idMap[a]);
  let recommendedRest = idSorted.slice(0, 1);

  return recommendedRest;
}

//userVotes: Map restaurant id -> boolean
//restaurantArray: simple array[] of restaurant objects
//restaurantsById: Map restaurant id -> full restaurant object
//keep in mind the user's position (size of userVotes)
function reorderArray(
  restaurantArray,
  userVotes,
  restaurantsById,
  yesVotes,
  noVotes
) {
  let catRanks = getAllCategoryPcts(yesVotes, noVotes, restaurantsById);
  catRanksSorted = Object.keys(catRanks).sort(
    (a, b) => catRanks[b] - catRanks[a]
  );
  let topRank = catRanksSorted.slice(0, 1)[0];

  Object.keys(restaurantsById).map(function (key, index) {
    let restaurant = restaurantsById.get(key);
    let rCats = restaurant["categories"];
    for (let k = 0; k < rCats.length; k++) {
      rCats[k] = rCats["title"];
    }
    if (rCats.includes(topRank)) {
      //push to front of restaurant array
      for (let i = 0; i < restaurantArray.length; i++) {
        if (restaurantArray[i]["id"] === key) {
          let removed = restaurantArray.splice(i);
          restaurantArray.unshift(removed);
        }
      }
    }
  });

  return restaurantArray;
}

//returns a map of the % of yes votes by category
function getAllCategoryPcts(yesVotes, noVotes, restaurants) {
  let pcts = new Map();
  for (const entry of restaurants.entries()) {
    for (const cat of entry[1].categories) {
      if (!pcts.has(cat.title)) {
        pcts.set(
          cat.title,
          getCategoryPct(cat.title, yesVotes, noVotes, restaurants)
        );
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
  return posVotes === 0 ? 0 : posVotes / (posVotes + negVotes);
}

module.exports = { recommendRestaurant, reorderArray };
