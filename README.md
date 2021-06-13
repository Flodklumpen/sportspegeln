# TDDD27_2021_sportstegen

_Sportstegen_ is a project written for the course TDDD27 _Advanced Web Programming_ during spring 2021. It is to be a website used for recording and showing the results from sports competitions, primarily tennis. During the course it was created and developed by me (Felicia Flod) and my project partner. After the course I alone continued the project. 

## Functional specification

This website enables users to organize a competition's order during a tournement. As a compeditor you can challange other compeditors that are up to three places before you in the competition. After your match you can write in the results and the tournement list will automaticaly be updated. to use this website you need to create a user and log in. When you are logged in you can view the tournament list and the results from all the games that has been played in that tournament. The website saves information about the game results to show statistics.

The matches in the tournaments are timebased and the player who has won the most games wins the match. All tournaments are played as a single format.

## Technichal specification

- Framework client-side: React + Redux
- CSS framework: React Bootstrap
- We use Auth0 to ensure a secure sign in.
- Server: Flask. Run server using WSGIServer
- Database: SQLAlchemy
- Testing: Postman and React's testing library. ([Link](https://www.getpostman.com/collections/56f11a2217e705260b7d) to import tests in Postman)

### Techniques for streamlining

- Use seeders and migration of the database, to streamline changes to the database.
- Use a specific file/files for contact between frontend and backend
- Use external libraries for styling the components (like React Bootstrap)

## Installation

While in frontend directory:

`npm install`

While in script directory:

`. req_install.sh`

While in backend directory:

`flask db upgrade`

## Scripts to run, build and test client

The following scripts can be run in the frontend directory. For more information, see [React's website](https://create-react-app.dev/docs/available-scripts/)

To run the app in development mode (open [http://localhost:3000](http://localhost:3000) to view it in the browser):

`npm start`

To launch the test runner:

`npm test`

To build the app for production:

`npm run build`

One can also run `npm run eject` if one is not satisfied with the build tool. **Note: it is a one-way operation!**

## Migration

When in backend directory:

Choose one:

- Create an empty revision script:

`flask db revision`

- Create a revision script which is populated with changes detected automatically:

`flask db migrate`

Upgrade the database:

`flask db upgrade`
