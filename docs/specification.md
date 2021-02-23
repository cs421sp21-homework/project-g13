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
- As a user, I would like to create a “swiping event” so that I can decide where I want to eat. 
- As a user, I would like to mark a restaurant as appealing or not during a “swiping event” so that I can narrow down my options.
- As a user, I would like to see each restaurant’s information so that I can decide if I like it or not.
- As a user, I would like to join a group so I can decide with my friends where to eat as a group.
- As a user, I would like to create a group so that I can decide where to each with my friends.
- As a user, I would like the restaurants shown to be close by so that I can actually get food there.
- As a user, I would like the recommendations to learn my preferences for the day as I swipe so that I can find a match restaurant earlier.
- As a group, we would like to be notified when we find a match so that we know we have found a place to eat at.
- As a group, we would like the “swiping event” to end after a certain amount of restaurants if no match was found so that it doesn’t go on forever.
- As a group, we would like to be shown a leaderboard of votes from high to low so that we can discuss among the options if no match was found.
- As a user, I would like my location and long term preferences (vegan etc.) to be remembered so I don’t have to set it repeatedly.
- As a user, I would like to create an account and login so that my information can be saved.
- As a group, we would like to have a group ID so that joining groups are easier.

**Nice to Have**
- As a user, I would like my location to be automatically detected so that I don’t have to manually input it.
- As a user, I would like to be presented only with restaurants open at the time of swiping so that I can actually get food there if I like it.
- As a user, I would like to join nearby groups so that joining groups are easier.
- As a user, I would like to see who’s in the group so that I know all my friends have joined.
- As a user, I would like to see trending restaurants nearby so that I know what the community thinks are the best options right now.
- As a user, I would like to set filters such as price and cuisine so that I can get tailored options.
- As a user, I would like to continue swiping if a match is already found so that I can find more potential places I want to eat at.

## Software Architecture & Technology Stack

- React for frontend
- HTML, CSS, JS for styling
- PostgreSQL for database persistence
- SparkJava for backend
- Heroku for deployment
