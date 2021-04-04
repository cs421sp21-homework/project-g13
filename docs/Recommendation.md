# Recommendation Algorithm Description

We aim to implement an algorithm to recommend restaurants to users that are similar in nature to previous restaurants
rated highly by those users. There are several strategies possible to build a recommendation algorithm such as content-based
filtering or collaboration-based filtering. Because we lack data from a large user-base, the best way to build a
recommendation system for our purposes was from analyzing the features of liked restaurants, known as a content-based recommendation system.

The system we have in place first builds a profile for each restaurant based off a set of features. These features can include
categories used to describe the restaurant, such as seafood, vegetarian, asian fusion, as well as price and rating. Then, we build
a group profile using the restaurant profiles that were most appealing to all of the users by weighting each feature according to
its favorability. Essentially, we computed the most favorable categories, price tier, and ratings from how the group voted on certain
restaurants to build a profile for what the most appealing restaurant would be for the group. Following this, in order to make predictions, we compare this group profile to the individual restaurant profiles already generated and compute similarity scores between each of the restaraunt profiles and the group profile. The restaurant with the highest similarity score is considered the winner and is recommended to the group if a match was not found.

Similarly, we use these similarity scores as users swipe through the list in an attempt to show them more favorable restaurants earlier on in the process so they can reach a match quicker.

There are several pros to using a content-based recommendation system. First, there is no need for data on other users, so it is easier to implement without data. Additionally, this system is able to recommend to users with unique tastes at a particular time and is able to provide explanations for those recommended items.
