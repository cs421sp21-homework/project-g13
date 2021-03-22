# Teamwork

Leader: Shanelle Cao

When2Meet: [click here](https://www.when2meet.com/?11286799-FBW9N)

# OO Design
![UML Diagram for iteration 2](assets/uml-diagram-updated-iteration2.png)

# Wireframe & Use-case

![Wireframe](assets/iteration2_wireframe.png)

**Use Case: Receiving assistance in choosing a restaurant**

1. The user opens the application.
2. The user will be presented with a sign-in/up page, view (1).
    - If they already made an account with us, the user will click on the "Sign in with Gmail" button.
      - The user will enter their e-mail and Google will handle the rest of the sign-in process, view (2).
    - Otherwise, they will click on the “Sign up” button.
      - Then, the user will enter their email such that an account is created, view (2).
3. The user will be presented with the "Start" page, view (3).
    - If they want to choose by themselves, the user will click on “Start”.
    - If they want to join a group, the user will click on the “Join a group” button.
      - The user will enter a group ID which represents a specific group to join, view (4).
      - The user is presented with a “Waiting…” screen until the host begins the selection process, view (5).
    - If they want to host a group, the user will click on the “Host a group” button.
      - The user will set the group’s location by clicking on the “Set Group Location” button.
      - The user will wait for people to join and click the “Start” button once everyone has joined, view (7).
4. The user will be presented with a place to enter their location, view (8).
5. The user/ will be presented with a "Restaurant option" page, view (9).
6. The user will click on "Yes" if they find the option appealing, or on "No" if they find it unappealing.
    - If the user clicks on "Yes", a new "Restaurant option" page will be presented.
7. If the user swipes right, the "Match found" page, view (10), will be presented.
      - The user will click on the "Done" button and be returned to the "Start" page.
8. If the user/group is unable to find a match after swiping through 10 restaurants, then a “No Match Found” screen is displayed, view (11).
    - The user will click “Yes” if they want to swipe through another collection of restaurants.
    - The user will click “No” if they want to end the swiping process.

# Iteration Backlog

- As a user, I would like to start a “swiping event” and  mark a restaurant as appealing or not so that I can narrow down my options.
- As a user, I would like to join a group so that I can decide with my friends where to eat as a group.
- As a user, I would like to create a group so that I can decide where to each with my friends.
- As a user, I would like to set the radius of search so that I can get to the restaurants that I am shown.
- As a group, we would like to be notified when we find a match so that we know we have agreed upon a restaurant.
- As a group, we would like the “swiping event” to end after a certain amount of restaurants if no match was found so that the swiping doesn’t go on infinitely.
- As a user, I would like to create an account and login so that my information can be saved.
- As a group, we would like to have a group ID so that joining groups is easier.

# Tasks

- create the frontend interactions for joining and hosting groups
- create the frontend pages for match found/no match found
- implement the account login system (front- and back-end)
- create the database for storing user info and group IDs
- implement the assignment and managing of group IDs
- implement joining and hosting groups in the backend
- implement the like and dislike functions for individual users
- implement the like and dislike voting system for groups

# Retrospective

For this iteration we finished off what was left from iteration 1, which was implementing the like and
dislike functions for individual users when swiping. We also aimed to implement group features where users could
join or host groups with friends. The entire swiping process for individual users now runs smoothly, where upon
pressing Start they are redirected to enter their address, then restaurants are shown one by one if the user presses
dislike. Once the like button is pressed they will be redirected to the match found page, showing them the restaurant
they've picked. Also, if the user browsed 20 restaurants and didn't like any of them, they will be redirected to the
no match found page and asked if they would like to start again. The group functionalities are achieved using socket.io.
If a user hosts a group, group ID will be generated and others can use that ID to join the group. Only the host can set
the location of search and start the swiping session. Once the host presses Start, the swiping process begins for everyone
in the group, and a match found page will be shown once everyone in the group votes like for the same restaurant.
Or else, a no match found page will be shown after 20 restaurants have passed. Currently, the start again function when no
match is found is not fully implemented as we need to figure out how to re-fetch restaurants without prompting users
to enter their address again. Originally for this iteration we also set out to implement a login system, where a user can
create an account and save their name to be displayed in groups.
However, due to time constraints this part of the user story couldn't be fully implemented, which was a concern we had in
the beginning of this iteration that there are too many user stories to fulfill. Overall, this iteration was mildly challenging,
as we struggled with React routing and data passing, and trying to complete all user stories planned.
For the next iteration to work smoother, we need to complete the remaining tasks from this iteration fast and start on the user
stories for the next iteration earlier.
