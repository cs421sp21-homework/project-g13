# Teamwork

Leader: Abdullah

When2Meet: https://www.when2meet.com/?11681146-YlLxK

## Meetings
Our meeting time is 4pm EDT

### Future Meetings
April 19, 2021 @ 4pm
Meeting tasks:
- Decide what user stories to complete for iteration 5
  - Assign tasks
- Decide on what everyone will do for the final presentation
  - Opening/closing remarks

### Past Meetings

# OO Design

# Wireframe & Use-case

# Iteration Backlog
- As a user, I would like to continue swiping if a match is already found so that I can find more potential places I want to eat at.
- As a user, I would like to be presented only with restaurants open at the time of swiping so that the restaurant I've decided on is available right away.
- As a user, I would like to see who’s in the group so that I know all my friends have joined.
- As a user, I would like to see the most common matches in my area to help me make a decision. (** needs discussionn **)
- As a user, I would like the program to get my real-time location so that I don’t have to manually enter it.

## Might delete these:

- As a user, I would like to be able to detect and join nearby groups so that joining our group is faster when hanging out with friends.
- As a user, I would like to see trending restaurants nearby so that I know what the community thinks are the best options right now. (** needs discussionn **)

# Tasks

- Allow users/groups to continue swiping when a match is found
  - Add buttons in the MatchFound and No Match Found pages to continue searching for restaurants

- Add a toggle in the Host page for users/groups to choose to search only for restaurants that are currently open 
  - Connect this toggle to the app state
  - Modify frontend code for connecting to backend APIs to include a flag for searching only for currently open restarants when true, and searching normally (all restaurants) when false

- Modify API endpoints for searching for restaurants that are currently open (i.e. add a flag such that when true searches only for restaurants that are currently open, otherwise searches normally)

- Make the socket.io server send a group member name when someone joins a group
  - Make the Group page receive such "member name" data
  - Upon receiving such data (described above), show the names of members of the group on the page

- On the Set Location page, add a button for retreiving location automatically
  - Add functionality for retreiving the user's location automatically and connect it to the button

# Retrospective

