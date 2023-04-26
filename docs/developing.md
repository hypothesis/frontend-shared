# Development guide

## Development workflow

Run a local webserver that will rebuild on changes to JS or SASS source.

```shell
$ make dev
```

You can view the pattern library at http://localhost:4001/

The pattern library is hosted at https://patterns.hypothes.is/. It gets deployed automatically when a new package version is published.

It can be manually deployed using the [deploy workflow](https://github.com/hypothesis/frontend-shared/actions/workflows/deploy.yml)

## Testing locally with other projects

This section explains how to test other applications (e.g. [`client`](https://github.com/hypothesis/client), `lms`) with
a local build of this project's package.

### Configure

1. Install [`yalc`](https://www.npmjs.com/package/yalc)
2. Build and publish locally to `yalc`

   ```shell
   $ cd frontend-shared
   $ yarn build
   $ yalc publish
   ```

3. Use this local package from the target application

   ```shell
   $ cd <application project directory>
   $ yalc add @hypothesis/frontend-shared
   $ yarn install
   ```

   _Note_: This will make changes to `package.json`. Take care not to commit
   these changes; clean up as described below.

### Develop

To push changes from `frontend-shared` to `yalc` installations:

```shell
$ cd frontend-shared
$ yarn build
$ yalc push
```

### Clean up

To remove `yalc` linking from an application and restore the project-defined
published package version files to `node_modules`:

```shell
$ cd <application project directory>
$ yalc remove @hypothesis/frontend-shared
$ yarn --check-files
```

## Adding new components

Before adding a component, determine:

- What **category** of component it will be: simple, presentational or composite. You can read more about [component categories in the pattern library](http://localhost:4001/using-components).
- What **component group** it belongs to (e.g. `layout`, `feedback`). If you want to add a new group, you'll need to update `componentGroups` and the `PlaygroundRouteGroup` type in `src/pattern-library/routes.js`.

Each component in this package should have:

1. A component module in `src/components/{group}/{ComponentName}.js`
2. A test module in `src/components/{group}/test/{ComponentName}-test.js`
3. Pattern-library documentation, typically in `src/pattern-library/components/patterns/{group}/{ComponentName}Page.js`
4. Exports from its module directory and the project's entrypoint

### Generating component module files

You may create modules manually, or you can use [`plop`](https://plopjs.com/) to scaffold out some starter files. Run:

```sh
$ yarn run plop
```

and follow the prompts.

### New component checklist

Before opening a PR with a new component:

- [ ] determine component category (simple, presentational, or composite) and group
- [ ] implement the component
- [ ] write tests for the component
- [ ] ensure that exports are appropriate in `src/components/{group}/index.js` and `src/index.ts`
- [ ] test against an external application (`client` or `lms`) as described in "Testing locally with other projects" above
- [ ] add documentation to a new or existing pattern-library page (you may need to update `src/pattern-library/routes.js`)

## Icon components

Icon components are auto-generated from SVG source. To add a new icon component:

1. Add the SVG source to `images/icons`
2. Run the `scripts/generate-icons.js` script

The `generate-icons` script will also modify an existing icon component if changes have been made to its source.

Note that:

- Icon components do not require tests.
- Icon components will automatically show up on the Icons page in the pattern library.
