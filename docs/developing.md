# Development guide

## Development workflow

Run a local webserver that will rebuild on changes to JS or SASS source.

```shell
$ make dev
```

You can view the pattern library at http://localhost:4001/

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
