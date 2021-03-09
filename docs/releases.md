# Release process

The release process in broken up into 3 steps.

1. Increment the version and add a new tag
2. Modify the changelog
3. Merge the release branch and create a "github release"

## 1. Increment the version and add a new tag

To update the version in package.json and create a tag run:

```shell
$ yarn version
```

The version number should be updated following [Semantic Versioning](https://semver.org/#semantic-versioning-200). The only change should be to package.json, and there should be a new tag on the commit prefixed with a "v".

## 2. Modify the changelog

`CHANGELOG.md` highlights changes that are relevant for consumers of the package. Our changelog follows [keepachangelog](https://keepachangelog.com/en/1.0.0/).

### Steps to append to the changelog

Immediately after a version commit & tag, run the following command to create a draft list of changes relating to the new version.

```shell
$ gulp changelog
```

This command will generate a partial changelog and output it to the console. Copy the text and paste it above the previous version in `CHANGELOG.md` and be sure to leave a blank line between versions. The output is git logs between the current new version and the previous released version. It will be important to edit and trim down that list so that only the consumer-relevant changes are included.

### Edit the output

1. Delete any commits that are not relevant for a consumer.
2. Categorize the remaining important commits into various [types of changes](https://keepachangelog.com/en/1.0.0/#how).
3. Make sure to prefix anything that might break with "BREAKING CHANGE:"
4. Refactor the messages as needed to ensure they can be understood by a consumer.

When writing the changelog, please follow the [Keep a Changelog advice](https://keepachangelog.com/en/1.0.0/#how).

### Save and commit

Commit the changelog file with a simple message, then push the branch (make sure to push tags too) and merge to `main` after CI passes.

## 3. Create a new GitHub release

Create a [new github release](https://github.com/hypothesis/frontend-shared/releases/new/). The title of the release should be identical to the tag name and the message can copied from the result of step #2. When you are done, click "Publish".
