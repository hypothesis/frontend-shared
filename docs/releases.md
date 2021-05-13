# Release process

## 1. Version and tag

We use [Semantic Versioning](https://semver.org/#semantic-versioning-200).

1. Create a new working branch
2. Run

   ```shell
   $ yarn version
   ```

   This will update the `package.json` version, create a commit and add
   an annotated version tag.

## 2. Update the changelog

We use conventions from [keepachangelog](https://keepachangelog.com/en/1.0.0/).

1. Run

   ```shell
   $  gulp changelog
   ```

   This outputs some suggested changelog content based on `git` history

2. Edit `CHANGELOG.md` and commit changes

   Add content to `CHANGELOG.md` above the last set of changes. Edit the
   suggested output (above) to be useful and meaningful.

## 3. Squash, update tag, push

1. Squash into a single commit

   Squash or amend the changelog edits into the same commit as the `package.json`
   version bump. You should now have a single commit on your branch.

2. Move the version tag

   You've created a new commit with the combined version/changelog changes,
   and the version tag needs to be updated to point at the hash for this combined commit:

   ```shell
   $ git tag -af <tag> <commit>
   ```

3. Push

   Push both the branch and the tag

   ```shell
   $ git push origin <tag> <branch>
   ```

   Where `<branch>` can be `HEAD` assuming you have the release branch checked out locally.

## 4. Merge and release

1. Go through the PR/merge cycle for the version-update branch
2. Create a [new GitHub release](https://github.com/hypothesis/frontend-shared/releases/new/)

   - Title: use the tag name
   - Message/Description: Paste in changelog changes
   - Binary: nope

   Publishing this will kick off a GitHub Action that will publish the package.

## 5. Check your work

- Check to see if the version has been updated on [npm](https://www.npmjs.com/package/@hypothesis/frontend-shared)
- Check the contents of the package on UNPKG. The URL pattern is `https://unpkg.com/browse/@hypothesis/frontend-shared@<version>/`, e.g. https://unpkg.com/browse/@hypothesis/frontend-shared@1.11.0/
