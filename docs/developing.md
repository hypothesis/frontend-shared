# Development guide

## Development workflow

Run a local webserver that will rebuild on changes to JS or SASS source.

```shell
$ make dev
```

You can view the pattern library at http://localhost:4001/ui-playground

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

3. Link to this local package from the target application

   ```shell
   $ cd <application project directory>
   $ yalc link @hypothesis/frontend-shared
   ```

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
$ yarn --check-files
```

If needed, you can clear out any remaining vestiges of `.yalc` metadata from
the project:

```shell
$ yalc remove @hypothesis/frontend-shared
```
