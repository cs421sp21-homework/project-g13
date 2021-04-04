# Teamwork

Leader: Eric

When2Meet: https://www.when2meet.com/?11499666-d2ubT

# OO Design

![UML Diagram for iteration 3](assets/iteration3uml.png)

# Wireframe & Use-case

![Wireframe](assets/iteration3_updated_wireframe.png)

**Use Case: Receiving assistance in choosing a restaurant**

1. The user will set their preferences for the swiping event using the "Set Filters" button from the "start" page, view (1).
2. The user will select their preferences, such as Cuisine Type or Price, to help filter their results, view (2).
3. If an individual user could not find an exact match based on their preferences, they will be presented with a recommnded restaurant and the option to try again, view (3).
4. If a group could not find an exact match, then they will be presented with a recommended restaurant, option to try again, and a leaderboard of restaurants to see how people generally voted, view (4).

# Iteration Backlog

- As a user, I would like the program to learn my preference for the day based on my swipes and show me restaurants that match my preference so that I can find a restaurant earlier.
- As a group, we would like to be shown a leaderboard of votes from high to low and a recommended restaurant if no match was found so that we can discuss among our options.
- As a user, I would like my location and long term preferences (vegan, vegetarian, allergies etc.) to be remembered so that I don’t have to set it repeatedly.
- As a user, I would like to set filters such as price and cuisine so that I can get tailored options.

# Tasks

- creating and working on the recommendation algorithm (this is beyond CRUD) -> Nathaniel
- recommending a restaurant if no match was found (frontend? I guess we can "call" the recommendation algorithm) -> Eric
- showing the top choices of restaurants (involves socket.io, frontend) -> Shanelle
- storing permanent user preferences in the backend (involves database and backend) -> Siqi
- allowing the user to store and access permanent preferences in the frontend (UI stuff/React) -> Siqi
- adding filters when searching for restaurants in the backend (involves backend and Yelp API) -> Daniel
- adding UI for filtering restaurants (frontend/UI) -> Abdullah

# Retrospective
