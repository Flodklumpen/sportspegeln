# TDDD27_2021_sportstegen

Project for course TDDD27 Advanced Web Programming

## TODO (prel.):

- [ ] Write guide/instructions for merging and commiting (ex: [WIP], [FIX], [FEAT], [TEST], [MERGE] etc.)
- [ ] Merging: rebase without squashing commits, merge without deleting source branch
- [ ] Write down background of project (course instructions etc)
- [ ] Determine frameworks
- [ ] Describe project idea
- [ ] write technichal and functional specification (in README)
- [ ] Fix CI/CD (maybe?)
- [ ] Decide on a code/file structure

## Functional specification

What will the website do?

## Technichal specification

What will we use? 

## Git info

### Commit messages

Commit messages shall be written on the following format: **[<TAG>] <description>**

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
5. **_some more rules for merging_**

