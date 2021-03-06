# Chicken Tinder

Can't decide what to eat? Hop on Chicken Tinder by yourself or with friends for some recommendations!

Deploy Link: https://chicken-tinder-13.herokuapp.com/

**Advisors**

| Name     | JHU Email    | GitHub Username |
| -------- | ------------ | --------------- |
| Nanxi Ye | nye3@jhu.edu | maxye-frz       |

**Team**

| Name                | JHU Email        | GitHub Username |
| ------------------- | ---------------- | --------------- |
| Abdullah Yousuf     | ayousuf3@jhu.edu | ayousuf23       |
| Nathaniel Eisenberg | neisenb3@jhu.edu | nateeisenberg1  |
| Daniel Okereke      | dokerek1@jhu.edu | welper          |
| Shanelle Cao        | scao15@jhu.edu   | scao15          |
| Siqi Cao            | scao16@jhu.edu   | siqicao2016     |
| Eric Saenz          | esaenz2@jhu.edu  | ericsaenz       |

## Installing / Getting started

```
cd code/frontend
npm install
npm start run
```

Set your directory to the frontend directory. Install all the dependencies for the project. Then, run the frontend! The address for the frontend is in the terminal output. Head to that address and you'll see the frontend running!

## Developing

### Built With

- React 17
- SparkJava 3

### Prerequisites

What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.

- Java 11 (https://adoptopenjdk.net/)
- NodeJS: https://nodejs.org/en/download/

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/cs421sp21-homework/project-g13.git
cd cs421sp21-homework/project-g13/code/frontend
npm install
```

First, we clone the git repository, so we can access all the files easily and make commits, branches, etc. Second, we go to the frontend section and install the project dependencies.

### Building

To build the backend:

```shell
cd cs421sp21-homework/project-g13/code/backend
./gradlew build build
```

To build the frontend:

```shell
cd cs421sp21-homework/project-g13/code/frontend
npm run start
```

First, we locate the correct directory to either build the frontend or the backend. After certain changes to the backend, you run the gradle command to rebuild it. The frontend can be rebuilt by running npm run start, however it should rebuild automatically if the npm run start command is currently running.

### Deploying / Publishing

These are some instructions in order to deploy the backend or the frontend to heroku.

To deploy the backend:

```shell
cd cs421sp21-homework/project-g13/code/backend
./gradlew deployHeroku
```

To deploy the frontend:

```shell
cd cs421sp21-homework/project-g13/code/backend
git push heroku main
```

First, we access the correct folders in the code where the frontend or the backend are. Then, we deploy the frontend or the backend by the necessary commands to send the most updated code to Heroku.

## Versioning

We are using [SemVer](http://semver.org/) for versioning.

After iteration 1, we have deployed version 0.1.0

## Configuration

Currently, the only configuration a user can enter while using the project is that of the individual consumer. They open the application and the only thing they can currently do is input a location and, upon submitting that location, they can click through some close-by restaurants.

## Tests \*

We currently do not have any tests written for iteration one. For this iteration, as we don't have a database and only take in one piece of information from the user, there wasn't any functions we could test at this time, but as we start building a database and adding more functionality to the frontend, we will add more tests.

## Style guide

We are following the [Javascript](https://google.github.io/styleguide/jsguide.html) style guide for the frontend and the [Java](https://google.github.io/styleguide/javaguide.html) style guide for the backend.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.

- Yelp API: https://www.yelp.com/developers/documentation/v3/

## Database

We didn't implement a database for iteration 1. We do not currently store restaurant or user information in a database yet as our goals for this iteration were to connect to the Yelp API and display restaurants close to the user based off their location input. Iteration 2 will involve developing a database to store user information.
