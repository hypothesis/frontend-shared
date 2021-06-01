# Shared resources for Hypothesis front-end applications

A package of resources for Hypothesis front-end applications.

## Requirements

Your project must have Preact installed as a dependency.

`npm install --save preact`

## Usage

```
$ npm install @hypothesis/frontend-shared --save
```

### In SASS modules

To import default styling of frontend-shared components, include this line in the main project's SASS.

```scss
@use '@hypothesis/frontend-shared/styles';
```

Mixins can be imported directly

```scss
@use "@hypothesis/frontend-shared/styles/mixins" as mixins;
```

### In JS

```js
import { SvgIcon } from '@hypothesis/frontend-shared';
```

## Additional documentation

- [Development guide](docs/developing.md)
- [Release guide](docs/releases.md)
