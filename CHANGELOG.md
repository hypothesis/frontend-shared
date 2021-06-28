# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v3.3.0] - 2021-06-28

Updates `Modal` to allow overflow/scrolling of content. Adds numerous simple
components for laying out and styling content.

### Added

- Wrap `Frame`, `Card` and `Actions` patterns with components [#122](https://github.com/hypothesis/frontend-shared/pull/122)
- Text input patterns and simple components [#114](https://github.com/hypothesis/frontend-shared/pull/114)
- Allow for overflow constraints on content within Modals [#112](https://github.com/hypothesis/frontend-shared/pull/112)
- Add additional utility mixins and classes [#110](https://github.com/hypothesis/frontend-shared/pull/110)

### Changed

- Refine structure and naming of Pattern-library components and sections [#113](https://github.com/hypothesis/frontend-shared/pull/113)
- Adjust utils and patterns based on real-world use [#111](https://github.com/hypothesis/frontend-shared/pull/111)

### Fixed

- Ensure the `Panel` component registers its icons [#117](https://github.com/hypothesis/frontend-shared/pull/117)
- Fix `IconButton` horizontal icon alignment on narrow screens [#109](https://github.com/hypothesis/frontend-shared/pull/109)

## [v3.2.0] - 2021-06-15

Adds theming support.

- Add basic clean-theme support and update `card`, `frame` patterns [#89](https://github.com/hypothesis/frontend-shared/pull/89)

## [v3.1.1] - 2021-06-11

Fix typo in Changelog.

## [v3.1.0] - 2021-06-11

Updates `Checkbox` to use styled SVG for appearance and introduces an internal
spacing system.

- Add styling, design pattern for checkbox components [#95](https://github.com/hypothesis/frontend-shared/pull/95)
- Introduce spacing-unit scale and spacing patterns [#92](https://github.com/hypothesis/frontend-shared/pull/92)

## [v3.0.0] - 2021-06-08

`Dialog`, `Modal` and `ConfirmModal` components added.

All CSS classes generated are now prefixed with `.hyp-` (utilities and
patterns: private to package) or `.Hyp-` (component CSS classes, public).

Adds styling for a `dark` variant of `IconButton`.

### Added:

- Add prefixes to all component class names to prevent collisions [#90](https://github.com/hypothesis/frontend-shared/pull/90)
- `Modal`, `ConfirmModal` components and design patterns [#88](https://github.com/hypothesis/frontend-shared/pull/88)
- Add styling for `dark` variant of `IconButton` [#79](https://github.com/hypothesis/frontend-shared/pull/79)
- Add Dialog Component [#75](https://github.com/hypothesis/frontend-shared/pull/75)
- Add `overlay` and `fixed-centered` layout patterns [#73](https://github.com/hypothesis/frontend-shared/pull/73)

### Changed:

- Re-order (intended) CSS output and make SASS source directories reflect this [#78](https://github.com/hypothesis/frontend-shared/pull/78)
- Simplify routing and pattern component names [#76](https://github.com/hypothesis/frontend-shared/pull/76)

## [v2.1.0] - 2021-05-19

### Added:

- Establish basic color patterns [#70](https://github.com/hypothesis/frontend-shared/pull/70)
- Add colors page to pattern library [#306d501](https://github.com/hypothesis/frontend-shared/commit/306d501f3e6025b3d6c5287f11be93a63b20afdf)
- Add `colors` utility classes with foreground, background classes [#a756276](https://github.com/hypothesis/frontend-shared/commit/a75627676f9c1fcf4a8790d8d2a44cb5c199f6be)
- Add columnar actions pattern (`.hyp-actions--column`) and examples [#ad72271](https://github.com/hypothesis/frontend-shared/commit/ad72271b8a73765dcf453a8a8c029b4f46be7d5f)

### Changed:

- Remove `justify-content` rule from buttons [#f232224](https://github.com/hypothesis/frontend-shared/commit/f232224fc272be09552827e62da0b4a464a8c53a)
- Add clarification on availability of mixins [#69](https://github.com/hypothesis/frontend-shared/pull/69)
- Refactor greyscale colors [#237ef0a](https://github.com/hypothesis/frontend-shared/commit/237ef0ae639fbcfd986b71a1df81bbe5650e5037)

### Breaking changes:

- Prefix all utility and pattern classes with `.hyp-` and update docs [#66](https://github.com/hypothesis/frontend-shared/pull/66)

## [v2.0.0] - 2021-05-13

### Breaking changes:

- Set default `type` property of buttons to "button" [#62](https://github.com/hypothesis/frontend-shared/pull/62)

### Added:

- Add Checkbox component and patterns [#43](https://github.com/hypothesis/frontend-shared/pull/43)
- Add `Panel` component and adjust icon registration [#60](https://github.com/hypothesis/frontend-shared/pull/60)

## [v1.13.0] - 2021-04-28

### Added:

- Add pattern library and support to build and serve pattern library in a local webserver: [#39](https://github.com/hypothesis/frontend-shared/pull/39), [#38](https://github.com/hypothesis/frontend-shared/pull/38), [#37](https://github.com/hypothesis/frontend-shared/pull/37)

## [v1.12.0] - 2021-04-27

### Added:

- Add "cancel" icon SVG [#27](https://github.com/hypothesis/frontend-shared/pull/27)
- Add shared base element styling [#33](https://github.com/hypothesis/frontend-shared/pull/33)
- Add reset styles and mixins [#32](https://github.com/hypothesis/frontend-shared/pull/32)

### Changed:

- Add `buttonRef` prop to buttons [#28](https://github.com/hypothesis/frontend-shared/pull/28)

### Fixed:

- More accurately define the onClick event type [#29](https://github.com/hypothesis/frontend-shared/pull/29)
- Simplification and type improvement in button component [#23](https://github.com/hypothesis/frontend-shared/pull/23)

## [v1.11.0] - 2021-04-15

### Added

- Add button components and styles [#22](https://github.com/hypothesis/frontend-shared/pull/22)
- Add Makefile and update project configuration [#21](https://github.com/hypothesis/frontend-shared/pull/21)

## [v1.10.0] - 2021-03-09

### Added

- Add `yarn push` to be able to link to the client for development [#8](https://github.com/hypothesis/frontend-shared/pull/8)
- Add commands for testing / lint / typecheck / format [#1](https://github.com/hypothesis/frontend-shared/pull/1)
- Move `useElementShouldClose` and `normalizeKeyName` into frontend-shared package [#22ede8c](https://github.com/hypothesis/frontend-shared/commit/22ede8ccab173a7da8b2bc5218ad583bd630f8d1)
- Move `SvgIcon` to frontend-shared package [#0b02df5](https://github.com/hypothesis/frontend-shared/commit/0b02df5f4b3f72d4348570dd05f8f962a3a1b92e)
- Add SASS entry file [#0751cdb](https://github.com/hypothesis/frontend-shared/commit/0751cdbcf4ed2ec1b0f3862ececb0cec4ed909d7)
- Add `outline-on-keyboard-focus` mixin [#65dac43](https://github.com/hypothesis/frontend-shared/commit/65dac436c50d516ababa7d2b4a5708e5b51124b5)

## [v1.0.0] 2021-01-06

### Added

- Initial commit for frontend-shared
