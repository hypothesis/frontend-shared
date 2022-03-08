# SASS structure and conventions

## Current API

This package currently provides styles for all of its shared components as a single SASS entrypoint (`index.scss`) which is available to users of this package within their own SASS:

`@use '@hypothesis/frontend-shared/styles';`

## Conversion to Tailwind

Hypothesis front-end applications are currently transitioning to a utility-first approach using [TailwindCSS](https://tailwindcss.com/docs/installation).

To support consuming applications, this package provides a Tailwind preset (`src/tailwind.preset.js`) that represents our base design system. Applications may extend this preset in their own Tailwind configurations.

This package's component styling is still implemented in SASS (with mixins, variables, etc.). The plan is to convert all of the styling in consuming applications to Tailwind before returning to this project and converting it as well.

Until then, consuming applications may continue to use the main SASS entrypoint documented above.

## Deprecated SASS API

- `pattern-library.scss` (deprecated):

  `@use '@hypothesis/frontend-shared/styles/pattern-library';`

  May be imported for projects that wish to use and/or extend the pattern library. It is those projects' responsibility to build/bundle the resulting SASS.

- `mixins` (deprecated):

  `@use '@hypothesis/frontend-shared/styles/mixins/<mixin-module>';`

  - At this time, the only publicly-available mixins are `focus` and `buttons` (for button customizations only—use only if you know what you're doing). Do not use other mixins.
  - Mixins may not be available publicly in the future.

_Note_: `pattern-library.scss` is also used internally by this project to build a CSS bundle for serving the pattern library using `make dev`.
