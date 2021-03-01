# Development guide

This guide explains how to make changes to the `frontend-shared` package and use them with your local copy of the `client`.

## Client setup

Follow these steps to set up `frontend-shared` in the client repository.

#### 1. Install yalc

Install the `yalc` tool globally if you have not already done so.

```shell
yarn global add yalc
```

_Note_: [yalc](https://www.npmjs.com/package/yalc) is the tool that we use for locally making changes to a shared package and testing the changes in another project.

#### 2. Build & publish

Build the package and then publish to a a local yalc repository.

```shell
# from the frontend-shared dir
$ yarn build
$ yalc publish
```

#### 3. Link package

In the `client` repository, link to you local pushed repository

```shell
# from the client dir
$ yalc link @hypothesis/frontend-shared
```

This will install the built local version of your `frontend-shared` repository in the `client`
without a using symlink.

_Note_: Currently, there is no support for automatically rebuilding so any changes made to the `frontend-shared` files will need to be rebuilt and re-pushed as follows

```shell
# from the frontend-shared dir
$ yarn build
$ yalc push
```

_Note_: `yalc push` will automatically "push" the updated files to all copies of `frontend-shared` that have been linked via `yalc link @hypothesis/frontend-shared`.

### Removing the link

If you wish to revert back to the current installed version of `frontend-shared`, simply run

```shell
# from the client dir
$ yarn --check-files
```
