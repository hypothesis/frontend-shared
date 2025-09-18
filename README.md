# `@hypothesis/frontend-shared`

UI components for Hypothesis front-end applications.

## Installation

Your project must have `preact` and `tailwindcss` as dependencies.

```sh
$ yarn add preact tailwindcss @tailwindcss/postcss
$ yarn add @hypothesis/frontend-shared
```

In your project's CSS entry point, add a `@source` for the frontend-shared
package and import the Tailwind theme:

```css
@import 'tailwindcss' source(none);

/* Configure source files to scan for Tailwind classes. */
@source './node_modules/@hypothesis/frontend-shared/lib/**/*.js';

/* Import theme and utilities from shared package. */
@import '@hypothesis/frontend-shared/tailwind-config.css';
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
- [Adding examples](docs/examples.md)
