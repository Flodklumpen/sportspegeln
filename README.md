# TDDD27_2021_sportstegen

_Sportstegen_ is a project written for the course TDDD27 _Advanced Web Programming_ during spring 2021. It is to be a website used for recording and showing the results from sports competitions, primarily tennis.

The link to the Postman tests can be found under [Technichal specification](#technichal-specification)

## Functional specification

This website enables users to organize a competition's order during a tournement. As a compeditor you can challange other compeditors that are up to three places before you in the competition. After your match you can write in the results and the tournement list will automaticaly be updated. to use this website you need to create a user and log in. When you are logged in you can view the tournament list and the results from all the games that has been played in that tournament. The website saves information about the game results to show statistics.

The matches in the tournaments are timebased and the player who has won the most games wins the match. All tournaments are played as a single format.

### "Smaller" funtional requirements

- The results of the tournament will be updated automatically, without having to reload the page
- The arrangement of the page shall look "good" when resizing the window (responsive design)

### Possible extensions

- Implementation of client-side routing
- This website will primarily be used for tournements in tennis, but there is room for extensions in other sports.

## Technichal specification

- Framework client-side: React + Redux
- CSS framework: React Bootstrap
- We use Auth0 to ensure a secure sign in.
- Server: Flask. Run server using WSGIServer
- Database: SQLAlchemy
- Testing: Postman and ~~Selenium~~ React's testing library. ([Link](https://www.getpostman.com/collections/56f11a2217e705260b7d) to import tests in Postman. If you want to run the tests or check other thing with authentication, feel free to contact us)

### Techniques for streamlining

- Use seeders and migration of the database, to streamline changes to the database.
- ~~Write scripts for buildning and running the client/server~~
- ~~Write a simple serverstub for the client~~
- Use a specific file/files for contact between frontend and backend
- Use external libraries for styling the components (like Material UI)

## Changes from original plan

- No selenium
- React Bootstrap instead of Material UI
- No serverstub
- Moved tournament "building" from server to data base (linked list-ish)

## Work and time management

We will use a backlog of issues to work from, that shall be created together. We will work separetely on issues and test/control the code of the other person before it is merged into master to ensure that both lab pertners understand every part of the code. For the same reason we will take turns working on frontend and backend.

### Milestones (preliminary)

- **Mid course screencast (May 8th):** Have a basic client and server that can communicate with each other
- **One week before final deadline (May 28th):** Everything except individual screencasts done

## Git info

### Commit messages

Commit messages shall be written on the following format: **[\<TAG\>] \<description\>**

| Tag | Usage |
| ------ | ------ |
| DOC | Changes in documentation |
| FEAT | New feature |
| FIX | Bug fix |
| HACK | Temporary fix |
| MERGE| Merge |
| REFACTOR | Refactoring of code |
| STYLE | Formatting (e.g. missing semicolons) |
| TEST | Add or edit tests |
| WIP | Work in progress |
| STRUCTURE | Set up file structure |
| OTHER | Anything that doesn't fit the other tags |

### Merging

Follow these steps when merging branch _B_ into master:

**In terminal:**

1. Fetch changes to master (either by fetching or pulling)
2. **On branch _B_**: rebase the branch, **without** squashing the commits. Solve merge conflicts: `git rebase master`
3. Push up _B_, using force push: `git push -f`

**In web application:**

4. Create a merge request.
5. Make sure **not** to squash commits and **don't** delete the source branch.
6. Select both lab partners as approvers.
7. Merge when the request is approved by both partners.

## Installation

While in root directory, write in terminal:

`npm install`

## Scripts to run, build and test client

The following scripts can be run in the root directory. For more information, see [React's website](https://create-react-app.dev/docs/available-scripts/)

To run the app in development mode (open [http://localhost:3000](http://localhost:3000) to view it in the browser):

`npm start`

To launch the test runner:

`npm test`

To build the app for production:

`npm run build`

One can also run `npm run eject` if one is not satisfied with the build tool. **Note: it is a one-way operation!**

## Migration

When in root directory:

`cd api/`

Choose one:

- Create an empty revision script:

`flask db revision`

- Create a revision script which is populated with changes detected automatically:

`flask db migrate`

Upgrade the database:

`flask db upgrade`
