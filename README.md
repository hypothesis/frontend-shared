# `@hypothesis/frontend-shared`

UI components for Hypothesis front-end applications.

_Note_: This package currently provides two sets of components:

- **Legacy components**: a complete set is available, imported from `@hypothesis/frontend-shared/`. These components are styled with SASS and have some external assets.
- **Components**: An incomplete "updated" set is available, imported from `@hypothesis/frontend-shared/lib/next`. These components are styled with `tailwindcss` and have no external assets.

Legacy components are deprecated and are slated for removal at this package's next major version (v6).

## Installation

Your project must have `preact` and `tailwindcss` as dependencies.

```sh
$ yarn add preact tailwindcss
$ yarn add @hypothesis/frontend-shared
```

### tailwindcss configuration

Update your project's tailwind configuration:

```js
import tailwindConfig from '@hypothesis/frontend-shared/lib/tailwind.preset.js';

export default {
  // Use this package's preset
  presets: [tailwindConfig],
  content: [
    // Be sure to add this project's component source to your
    // tailwind content globs
    './node_modules/@hypothesis/frontend-shared/lib/**/*.js',
  ],
  // ...
```

## Documentation

Full documentation is available in this project's web-based pattern library.

1. Run the local web server:
   ```sh
   $ make dev
   ```
2. Visit http://localhost:4001/ in a browser

## Usage

```js
import { Link } from '@hypothesis/frontend-shared/lib/next';
```

### CSS (legacy)

To add styles for all shared components to your project's SASS:

```scss
@use '@hypothesis/frontend-shared/styles';
```

## Additional dev documentation

- [Development guide](docs/developing.md)
- [Release guide](docs/releases.md)
