# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v4.5.0] - 2022-01-31

Significant updates to dependencies in this package. The pattern library now styles
itself with Tailwind.

### Breaking

- Projects using the pattern-library SASS entrypoint at `styles/library` _must_ enable
  tailwind layers (`base`, `components` and `utilities`) beforehand.

### Changed

- Add text colors to tailwind preset [#303](https://github.com/hypothesis/frontend-shared/pull/303)
- Enable and use Tailwind in pattern library [#293](https://github.com/hypothesis/frontend-shared/pull/293)
- Extend tailwind preset with more goodies and support [#258](https://github.com/hypothesis/frontend-shared/pull/258)
- Enable tailwind for local pattern-library [#257](https://github.com/hypothesis/frontend-shared/pull/257)
- Upgrade tailwind and add touch-size minimum to preset [#245](https://github.com/hypothesis/frontend-shared/pull/245)
- Add dependabot configuration [#244](https://github.com/hypothesis/frontend-shared/pull/244)
- Update Foundations pages [#6bc1659](https://github.com/hypothesis/frontend-shared/commit/6bc165978044c67da57272b98398334f01647279)
- Remove external pattern-library CSS (unused) [#6b735b0](https://github.com/hypothesis/frontend-shared/commit/6b735b0b4f41610b1025f6ba1b7d49a6e03c28b7)

## [v4.4.0] - 2021-12-02

- Add tailwind dependency and provide tailwind preset [#242](https://github.com/hypothesis/frontend-shared/pull/242)

## [v4.3.0] - 2021-11-15

### Fixed

Reverts (removes) types for SVG "modules" [#239](https://github.com/hypothesis/frontend-shared/pull/239).

## [v4.2.0] - 2021-11-12

- Update Spinner and add FullScreenSpinner pattern and component [#237](https://github.com/hypothesis/frontend-shared/pull/237)
- Add types for SVG "modules" [#230](https://github.com/hypothesis/frontend-shared/pull/230)
- Fix demo-source layout and a wayward font rule [#231](https://github.com/hypothesis/frontend-shared/pull/231)

## [v4.1.0] - 2021-11-01

### Changed

- Add appropriate ARIA attributes for button role="tab" [#233](https://github.com/hypothesis/frontend-shared/pull/233)

## [v4.0.0] - 2021-10-27

### Breaking changes

This package is now published exclusively as an ES module package. The CommonJS
build has been removed. Downstream projects will need to use tools (eg. bundlers)
that understand ES modules and any references to the CommonJS build (
`@hypothesis/frontend-shared/lib-cjs/...`) will need to be updated to reference
the ES module files (`@hypothesis/frontend-shared/lib/...`).

See [#222](https://github.com/hypothesis/frontend-shared/pull/222).

## [v3.14.0] - 2021-10-26

### Added

- Add all icons and add new Icon component [#221](https://github.com/hypothesis/frontend-shared/pull/221), revise icon registration API [#217](https://github.com/hypothesis/frontend-shared/pull/217)
- Add `link` pattern and `Link` component [#211](https://github.com/hypothesis/frontend-shared/pull/211)
- Bring accessibility- and focus-related mixins and utils into package [#220](https://github.com/hypothesis/frontend-shared/pull/220)

### Changed

- Convert bundling to use Rollup [#213](https://github.com/hypothesis/frontend-shared/pull/213)
- Split pattern library SASS and remove remaining resets and element styles [#212](https://github.com/hypothesis/frontend-shared/pull/212), update CSS normalization [#209](https://github.com/hypothesis/frontend-shared/pull/209)
- Adjust selectors and classname for headers in Panels/Dialogs [#210](https://github.com/hypothesis/frontend-shared/pull/210)

### Deprecated

- `registerIcons` deprecated in favor of `registerIcon` in [#217](https://github.com/hypothesis/frontend-shared/pull/217)

## [v3.13.0] - 2021-10-05

- Update margins on spacing patterns [#205](https://github.com/hypothesis/frontend-shared/pull/205)

## [v3.12.0] - 2021-09-30

- Allow configuration of close, cancel buttons on Dialog [#203](https://github.com/hypothesis/frontend-shared/pull/203)

## [v3.11.0] - 2021-09-30

- Dual-build package as ES modules and CommonJS [#200](https://github.com/hypothesis/frontend-shared/pull/200)

  As a result of this change the CommonJS versions of modules within the package
  have moved from `lib/` to `lib-cjs/`.

- Add support for extra CSS classes to Checkbox components [#178](https://github.com/hypothesis/frontend-shared/pull/178)

## [v3.10.0] - 2021-09-15

Adds `emptyItemsMessage` to `Table`, reduces CSS specificity of `table` pattern
and fixes web root for the local pattern library.

### Added

- Add `emptyItemsMessage`, reduce CSS specificity for `Table` (`table` pattern) [#193](https://github.com/hypothesis/frontend-shared/pull/193)

### Changed

- Serve pattern library at web root [#192](https://github.com/hypothesis/frontend-shared/pull/192)

## [v3.9.0] - 2021-09-09

Add more options for `TextInput` `type`, and add `classes` prop support to all
`Button` components.

### Added

- Add support for other "text-like" input types to TextInput [#189](https://github.com/hypothesis/frontend-shared/pull/189)
- Add support for `classes` prop to Button components [#188](https://github.com/hypothesis/frontend-shared/pull/188)

## [v3.8.1] - 2021-09-02

Change to type declaration generation configuration.

### Changed

- Create types using `tsconfig.json` [#183](https://github.com/hypothesis/frontend-shared/pull/183)

## [v3.8.0] - 2021-09-02

Adds `Table` component. Adds `containerRef` prop to all container components.
Removes old Pattern Library components.

### Breaking Changes

- Pattern Library: Remove unused `PatternPage` component module and its styles [#4856b90](https://github.com/hypothesis/frontend-shared/commit/4856b906f88e0dd3d874c71a9c735746422f2fcb) -- older `Pattern*` components are no longer available: use `Library.*` components

### Added

- Add `Table` component [#174](https://github.com/hypothesis/frontend-shared/pull/174)
- Make all container components take `containerRef`; consolidate tests [#172](https://github.com/hypothesis/frontend-shared/pull/172)

### Changed

- Convert remaining pattern library pages to newer `Library` components [#175](https://github.com/hypothesis/frontend-shared/pull/175)

## [v3.7.0] - 2021-08-12

Updates the visual style of `Spinner`. Adds `Scrollbox` container component.

### Added

- Add Scrollbox container component [#170](https://github.com/hypothesis/frontend-shared/pull/170)
- Introduce a `table` pattern [#168](https://github.com/hypothesis/frontend-shared/pull/168)
- Add "scrollbox" pattern [#166](https://github.com/hypothesis/frontend-shared/pull/166)

### Changed

- Extract some reusable sample components and refactor Dialog examples [#169](https://github.com/hypothesis/frontend-shared/pull/169)
- Convert remaining patterns pages to newer Library components [#164](https://github.com/hypothesis/frontend-shared/pull/164)
- Add a very simple introductory page to the pattern library [#167](https://github.com/hypothesis/frontend-shared/pull/167)
- Update color foundations page to newer components [#160](https://github.com/hypothesis/frontend-shared/pull/160)
- Convert container-patterns page to newer Library components [#161](https://github.com/hypothesis/frontend-shared/pull/161)
- Update developer documentation: `yalc`, development workflow [#147](https://github.com/hypothesis/frontend-shared/pull/147)
- Only mock local components [#156](https://github.com/hypothesis/frontend-shared/pull/156)
- Remove remaining prop-types usage [#155](https://github.com/hypothesis/frontend-shared/pull/155)
- Make spinner visual treatment work better in various sizes [#154](https://github.com/hypothesis/frontend-shared/pull/154)

### Fixed

- Fix icon naming for Spinner component [#150](https://github.com/hypothesis/frontend-shared/pull/150)
- Do not hard-code `localhost` in web template asset paths [#165](https://github.com/hypothesis/frontend-shared/pull/165)

## [v3.6.0] - 2021-07-19

Adds ability to opt out of `Dialog`, `Modal` focus handling and fixes focus
mixins to work without the https://github.com/WICG/focus-visible polyfill.

### Changed

- Add ability to opt out of focus control for `Dialog`, `Modal` [#146](https://github.com/hypothesis/frontend-shared/pull/146)
- Library layout components, simplified [#144](https://github.com/hypothesis/frontend-shared/pull/144)

### Fixed

- Make `:focus-visible` rules work when polyfill not present [#145](https://github.com/hypothesis/frontend-shared/pull/145)

## [v3.5.0] - 2021-07-14

Renames a prop and adjusts error state for `TextInput`.

### Breaking Changes

- Change `error` prop to `hasError` on `TextInput` [#140](https://github.com/hypothesis/frontend-shared/pull/140)

### Changed

- Update structure of checkbox styling to match other patterns [#142](https://github.com/hypothesis/frontend-shared/pull/142)
- Remediate broken tests using `assert.exists` [#141](https://github.com/hypothesis/frontend-shared/pull/141)

## [v3.4.0] - 2021-07-01

Provides `Spinner` and `Thumbnail` components.

### Added

- Add `thumbnail` pattern, `Thumbnail` component [#133](https://github.com/hypothesis/frontend-shared/pull/133)
- Add `spinner` pattern and `Spinner` component [#132](https://github.com/hypothesis/frontend-shared/pull/132)
- Add `inputRef` to `TextInput` component [#130](https://github.com/hypothesis/frontend-shared/pull/130)

### Changed

- Rename `organisms` patterns to `panels` [#131](https://github.com/hypothesis/frontend-shared/pull/131)

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
