# Shared resources for Hypothesis front-end applications

A package of resources for Hypothesis front-end applications.

## Requirements

Your project must have Preact installed as a dependency.

`npm install --save preact`

## Usage

```
$ npm install @hypothesis/frontend-shared --save
```

### SASS

To add styles for all shared components to your project's SASS:

```scss
@use '@hypothesis/frontend-shared/styles';
```

### In JS

```js
import { SvgIcon } from '@hypothesis/frontend-shared';
```

## Additional documentation

- [Development guide](docs/developing.md)
- [Release guide](docs/releases.md)
