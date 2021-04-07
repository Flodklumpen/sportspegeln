# TDDD27_2021_sportstegen

_Sportstegen_ is a project written for the course TDDD27 _Advanced Web Programming_ during spring 2021. It is to be a website used for recording and showing the results from sports competitions, primarily tennis. 

## TODO (prel.):

- [X] Write guide/instructions for merging and commiting (ex: [WIP], [FIX], [FEAT], [TEST], [MERGE] etc.)
- [X] Merging: rebase without squashing commits, merge without deleting source branch
- [X] Write down background of project.
- [ ] Determine frameworks
- [ ] Describe project idea
- [ ] write technichal and functional specification (in README)
- [ ] Fix CI/CD (maybe?)
- [ ] Decide on a code/file structure

## Functional specification

What will the website do?

This website will primarily be used for tournements in tennis, but there is room for extensions in other sports. 

## Technichal specification

- Framework client-side: React + Redux
- We use Auth0 to ensure a secure sign in.
- Server: Flask
- Database: SQLAlchemy
- Rest API: TODO: **fråga om vi behöver specificera.**

For testing we will use Postman and Selenium. 

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

