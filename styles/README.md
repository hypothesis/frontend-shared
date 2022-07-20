# SASS structure and conventions (Legacy)

Legacy components in this package are styled with SASS.

## Current API

This package currently provides styles for all of its legacy components as a single SASS entrypoint (`index.scss`) which is available to users of this package within their own SASS:

`@use '@hypothesis/frontend-shared/styles';`

## Deprecated SASS

- `pattern-library.scss` (deprecated):

  `@use '@hypothesis/frontend-shared/styles/pattern-library';`

  May be imported for projects that wish to use and/or extend the pattern library. It is those projects' responsibility to build/bundle the resulting SASS.

_Note_: `pattern-library.scss` is also used internally by this project to build a CSS bundle for serving the pattern library using `make dev`.
