# Project Requirement Specification

Food-Tinder

## Problem Statement

People often have a hard time deciding what to order based on so much availability in resources and information. It becomes such a time consuming process, especially in a group of people who all have different opinions.

## Potential Clients

People who often order out in groups or individually and have trouble deciding what to eat.

## Proposed Solution

A web app that let's you and/or a group swipe on restaurants individually depending on if you would want
to get food from there. You initially set parameters for location, price, cuisine, etc., and then receive
recommendations based off those parameters as well as how you and your group swipe through the options.

## Functional Requirements

**Must Have**
- As a user, I would like the “swiping event” to fetch restaurants from Yelp so that I know what restaurants are available near me.
- As a user, I would like the restaurants to be shown one by one so that I am not flooded with too many options.
- As a user, I would like to enter my location so that I will be presented with restaurants around me.
- As a user, I would like to see each restaurant’s name, address, cuisine, price, rating, pictures, and a link to its website so that I can decide if I like it or not.
- As a user, I would like to start a “swiping event” and  mark a restaurant as appealing or not so that I can narrow down my options.
- As a user, I would like to join a group so that I can decide with my friends where to eat as a group.
- As a user, I would like to create a group so that I can decide where to each with my friends.
- As a user, I would like to set the radius of search so that I can get to the restaurants that I am shown.
- As a user, I would like the program to learn my preference for the day based on my swipes and show me restaurants that match my preference so that I can find a restaurant earlier.
- As a group, we would like to be notified when we find a match so that we know we have agreed upon a restaurant.
- As a group, we would like the “swiping event” to end after a certain amount of restaurants if no match was found so that the swiping doesn’t go on infinitely.
- As a group, we would like to be shown a leaderboard of votes from high to low and a recommended restaurant if no match was found so that we can discuss among our options.
- As a user, I would like my location and long term preferences (vegan, vegetarian, allergies etc.) to be remembered so that I don’t have to set it repeatedly.
- As a user, I would like to create an account and login so that my information can be saved.
- As a group, we would like to have a group ID so that joining groups is easier.

**Nice to Have**
- As a user, I would like the program to get my real-time location so that I don’t have to manually enter it.
- As a user, I would like to be presented only with restaurants open at the time of swiping so that the restaurant I've decided on is available right away.
- As a user, I would like to see who’s in the group so that I know all my friends have joined.
- As a user, I would like to see trending restaurants nearby so that I know what the community thinks are the best options right now.
- As a user, I would like to set filters such as price and cuisine so that I can get tailored options.
- As a user, I would like to continue swiping if a match is already found so that I can find more potential places I want to eat at.
- As a user, I would like to be able to detect and join nearby groups so that joining our group is faster when hanging out with friends.

## Software Architecture & Technology Stack

- React for frontend
- HTML, CSS, JS for styling
- PostgreSQL for database persistence
- SparkJava for backend
- Heroku for deployment
