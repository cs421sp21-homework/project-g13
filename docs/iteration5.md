# Teamwork

Leader: Abdullah

When2Meet: https://www.when2meet.com/?11681146-YlLxK

## Meetings
Our meeting time is 4pm EDT

### Future Meetings
Saturday or Sunday to practice the presentation

### Past Meetings
April 19, 2021 @ 4pm
Meeting tasks:
- Decide what user stories to complete for iteration 5
  - Assign tasks
- Decide on what everyone will do for the final presentation
  - Opening remarks -> Shanelle
  - Closing remarks -> Nathaniel
  - Who will demo what
    - Individual swiping process (location only) -> Daniel
    - Searching for restaurants with filters -> Eric
    - Joining/hosting groups -> Shanelle
    - Recommendation and leaderboard on no match found page -> Nathaniel
    - Login and storing user preferences -> Abdullah
  - What technical aspects will everyone discuss
    - Recommendation algorithm -> Nathaniel
    - Hosting/joining groups with socket.io -> Abdullah
    - Retrieving restaurant data from Yelp -> Eric
    - Storing user info on our database -> Daniel
    - General UML overview -> Shanelle
    - Frontend (React, etc) -> Shanelle

# OO Design

![UML Diagram for iteration 4](assets/iteration-4-uml-updated.png)

# Wireframe & Use-case

# Iteration Backlog
- As a user, I would like to continue swiping if a match is already found so that I can find more potential places I want to eat at.
- As a user, I would like to be presented only with restaurants open at the time of swiping so that the restaurant I've decided on is available right away.
- As a user, I would like to see who’s in the group so that I know all my friends have joined.

# Tasks

- Allow users/groups to continue swiping when a match is found -> Eric
  - Add buttons in the MatchFound and No Match Found pages to continue searching for restaurants -> Eric

- Add a toggle in the Host page for users/groups to choose to search only for restaurants that are currently open -> Nathaniel
  - Connect this toggle to the app state 
  - Modify frontend code for connecting to backend APIs to include a flag for searching only for currently open restarants when true, and searching normally (all restaurants) when false
  - Modify API endpoints for searching for restaurants that are currently open (i.e. add a flag such that when true searches only for restaurants that are currently open, otherwise searches normally) 

- Make the socket.io server send a group member name when someone joins a group -> Abdullah
  - Make the Group page receive such "member name" data
  - Upon receiving such data (described above), show the names of members of the group on the page

- Connect user accounts preferences to restaurant search in socket.io -> Daniel

- UI Improvements -> Shanelle
  - Clarifying buttons on the home page
  - Making sure pages look the same
  - Adding UI for storing user info
  - Add a logout button on account page

- Refining user login system -> Daniel
  - User doesn't get logged out after refreshing 
  - Allowing users to store/retrieve their addresses 
    - Add an endpoint for storing addresses
    - Add an endpoint for retreiving addresses

- Wireframe -> Daniel

# Retrospective

