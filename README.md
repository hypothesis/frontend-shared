# `@hypothesis/frontend-shared`

UI components for Hypothesis front-end applications.

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
import { Link } from '@hypothesis/frontend-shared';
```

## Additional dev documentation

- [Development guide](docs/developing.md)
- [Release guide](docs/releases.md)
