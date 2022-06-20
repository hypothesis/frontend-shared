# Release process

## 1. Version and tag locally

We use [Semantic Versioning](https://semver.org/#semantic-versioning-200).

1. Create a new working branch
2. Run

   ```shell
   $ yarn version
   ```

   This will update the `package.json` version, create a commit and add
   an annotated version tag.

3. Push your tag and branch: `git push origin <tag> <branch>`

## 2. Merge and release on GitHub

1. Go through the PR/merge cycle for the version-update branch
2. Create a [new GitHub release](https://github.com/hypothesis/frontend-shared/releases/new/)

   - Title: use the tag name
   - Click the `Auto-generate release notes` button to generate release notes.
     Release notes are _required_. We use [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) formatting. Be sure to highlight any breaking changes.
   - Binary: nope

Publishing this will kick off a GitHub Action that will publish the package.

## 3. Check your work

- Check to see if the version has been updated on [npm](https://www.npmjs.com/package/@hypothesis/frontend-shared)
- Check the contents of the package on UNPKG. The URL pattern is `https://unpkg.com/browse/@hypothesis/frontend-shared@<version>/`, e.g. https://unpkg.com/browse/@hypothesis/frontend-shared@1.11.0/
