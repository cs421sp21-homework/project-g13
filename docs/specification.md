# Project Requirement Specification

Food-Tinder

## Problem Statement

People often have a hard time deciding what to order based on so much availability in resources and information. It becomes such a time consuming process, especially in a group of people who all have different opinions.

## Potential Clients

18-30 year olds who often order out in groups or individually and have trouble deciding what to eat.

## Proposed Solution

A mobile app that let's you and/or a group swipe on restaurants individually depending on if you would want
to get food from there. You initially set parameters for location, price, cuisine, etc., and then receive
recommendations based off those parameters as well as how you and your group swipe through the options.

## Functional Requirements

**Must-have**

- As a user, I would like to create a "swiping event" for the purpose of assisting me in deciding where I should go to eat.
- As a user, I would like to be presented with a continuous stream of restaurant options during the "swiping event."
- As a user, I would like for each option that is presented to me to also display information about the restaurant taken from the Yelp API, such as location, price, operating hours, menu items, and pictures of the exterior.
- As a user, I would like to choose whether or not a restaurant option is appealing to me at this moment by swiping right, or unappealing by swiping left.
- As a user, I would like a new restaurant option to be presented to me once I have swiped right or left on the option I am currently looking at.
- As a user, I would like the "swiping event" to end once a "match" has been found. When I am the only one in the "swiping event," this would be once I have swiped right on an option.
- As a user, I would like to be able to create a "swiping event" that a group of my peers can join for the purpose of assisting us in deciding on one restaurant to all go to eat at together.
- As the host of a group "swiping event," I would like for the application to generate a unique group ID that my peers can use in order to join.
- As a user, I would like to be able to enter a group ID in order to join a particular group "swiping event."
- As a user, I would like to be able to enter my name when joining a group.
- As the host of a group "swiping event," I would like to be able to view a list of users who have joined the group and begin the "swiping event" once everyone that I am expecting has joined.
- As a user, I would like for a group "swiping event" to work identically to a one-person "swiping event," except that a "match" is found only once each group member swipes right on one particular restaurant.
- As a member of a group, I would like to be notified once a "match" for the group has been found.
- As a member of a group, I would like for the "swiping event" to end after a certain amount of restaurant options are presented to each group member even if no "match" for the group has been found.
- As a member of a group, if no "match" is found, I would like to be presented with a list of restaurants that received the most "right-swipes" within the group.
- As a user, I would like to create a personal account for use within the app.
- As a user with an account, I would like for my preferences concerning types of restaurants be assessed by the app based on which restaurants I have swiped right on in the past.
- As a user with an account, I would like for these preferences to be remembered and associated with my account.
- As a user with an account, I would like for the order I am presented restaurant options during a "swiping event" to be based on my preferences, with restaurants I am likely to prefer being presented first.
- As a user with an account, I would like for all these features to stay the same for me whenever I am logged in, no matter which machine I am using.

**Nice-to-have**

- As a user, I would like the app to get my location automatically in order to find nearby restaurants.
- As a user, I would only like to only be presented with restaurants that are open during a "swiping event."
- As a user, I would like to set constraints such as distance from me, price, and type of food when creating a "swiping event," and then only be presented with restaurants that meet those constraints.
- As a user with an account, I would like to see my history of past groups and "matches".
- As a user with an account, I would like to be able to "favorite" restaurants to increase their priority during "swiping events," meaning they will be shown to me before any other restaurants.
- As a user with an account, I would like to have the option to be shown restaurants at random during a "swiping event" instead of using my preferences, as if I was not signed in.
- As a user, I would like for the app to detect nearby groups to make joining them simpler.
- As a member of a group, I would like restaurants that other members of the group have already swiped right on to be presented to me with increased priority, in order to find "matches" faster.
- As the host of a group, I would like to be able to continue the "swiping event" even after a "match" has been found, to see if there is another potential "match."
- As a member of a group, I would like to be able to see a list of all the group's "matches" so far.
- As a user with an account, I would like to search for restaurants outside of a swiping event in order to add favorites.
- As a user, I would like to see trending restaurants in my area so that I can have more relevant results.
- As a user, I would like to swipe anonymously while in a group so that I can voice my opinion without fear of judgment. 

## Software Architecture & Technology Stack

- React Native for frontend
- HTML, CSS, JS for styling
- PostgreSQL for database persistence
- SparkJava for backend
- Heroku for deployment
