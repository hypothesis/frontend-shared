# How to version and publish `frontend-shared`

## Summary

1. **Update the package version** in `package.json` and merge that change into the `main` branch[^1]. We use [Semantic Versioning](https://semver.org/#semantic-versioning-200).
2. **Create a tag** pointing at the version-change commit and generate a **new GitHub release** (details follow). Publishing a GitHub release will kick off a GitHub Action that will **publish the `@hypothesis/frontend-shared` package to `npm`.**

## Creating a GitHub release

Create a [new GitHub release](https://github.com/hypothesis/frontend-shared/releases/new/) with these values:

1.  _Tag_: Create a new tag for the release, targeting the `main` branch (your just-merged version bump should be at the tip)[^2]. The tag should match the version number, e.g. `v5.2.1`.
2.  _Title_: Use the tag name.
3.  Click the `Auto-generate release notes` button to generate release notes and edit as needed. We use [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) formatting.[^3]
4.  Leave other fields alone/as defaults.

## Verify the release

- Check to see if the version has been updated on [npm](https://www.npmjs.com/package/@hypothesis/frontend-shared)
- Check the contents of the package on UNPKG. The URL pattern is `https://unpkg.com/browse/@hypothesis/frontend-shared@<version>/`, e.g. https://unpkg.com/browse/@hypothesis/frontend-shared@5.2.0/

[^1]: Unlike other PRs, a version-bump PR does not require review. But do wait for CI to complete first.
[^2]: You can create a tag manually as a separate step if you want to tag a non-tip commit.
[^3]: You can look at release notes for [other recent releases](https://github.com/hypothesis/frontend-shared/releases) as exemplars. You don't need to include every change (especially, e.g., dependency updates).
