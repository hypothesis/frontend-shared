# Shared resources for Hypothesis front-end applications

A package of resources for Hypothesis front-end applications.

#### Requirements

- preact
- browserify

### Usage

```
$ npm install @hypothesis/frontend-shared --save
```

#### In SASS modules

To import default styling of frontend-shared components, include this line in the main project's SASS.

```sass
@use '@hypothesis/frontend-shared/styles';
```

Mixins can be imported directly

```sass
@use "@hypothesis/frontend-shared/styles/mixins" as mixins;
```

#### In JS

```js
import { SvgIcon } from '@hypothesis/frontend-shared';
```

### Additional documentation

[Development guide](docs/developing.md)
