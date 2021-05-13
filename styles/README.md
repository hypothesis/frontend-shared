# SASS structure and conventions

The public SASS interface for the `frontend-shared` package is:

- `index.scss`:

  `@use '@hypothesis/frontend-shared/styles';`

  All of the styles needed for the shared components provided by the package.

- `pattern-library.scss`:

  `@use '@hypothesis/frontend-shared/styles/pattern-library';`

  May be imported for projects that wish to use and/or extend the pattern library. It is those projects' responsibility to build/bundle the resulting SASS.

- `mixins`:

  `@use '@hypothesis/frontend-shared/styles/mixins/<mixin-module>';`

  Individual reusable mixins, e.g. `focus`

_Note_: `pattern-library.scss` is also used internally by this project to build a CSS bundle for serving the pattern library using `make dev`.

## Quick FAQ

### Q: Should we be replacing utility variables, mixins and styles in consuming applications with these shared versions?

**A**: Ultimately, yes, but _not yet_. As shared atomic patterns, base styling and utilities are migrated and centralized here, they are being tightened up and applied in a more refined state to the components that are provided by the package. They may conflict with existing utility classes and mixins in other applications in implementation and naming and **should not be used directly (yet)**.

Utility mixins and classes are being added as-needed, and the current collection is incomplete.

(See above about the current public interface for this package's SASS assets).

### Q: But not all of the existing modules and directories follow the patterns given below—wat?

**A**: This is very true! Please consider this document aspirational and evolving. For example, the modules and directories for the shared button components don't currently align with this structure. There is work to do.

### Q: But wait, I need access to other SASS modules to get at mixins or to customize something.

**A**: This is most salient for shared button components at present.

Note that all SASS modules in this project's package can be imported, by deeper traversal, e.g. `@use '@hypothesis/frontend-shared/styles/components/buttons`, though this will be increasingly discouraged as this package matures.

Isolate your customizations within a single module in the consuming application SASS (avoid adding dependencies to this repository's SASS in multiple places for ease of maintenance later). See the `client` for how buttons are customized in SASS. It is the hope that customization will become a rarer exception as these patterns get more established.

### Q: How much do I need to know about Atomic Design to get my job done here?

Mixins in `mixins` and utility styles in `util` loosely apply [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) concepts. Use Atomic Design concepts as long as they're useful, but don't feel compelled to force everything into the model if it doesn't fit. And the level of rigor that Atomic Design is applied to the structure here will evolve over time.

- `atoms` are basic units of design: borders, shadows, etc.
- `molecules` are small constructs composed of `atoms`
- `organisms` are constructs composed of `molecules`

## Directories

The directory that a SASS module lives in dictates what it should provide (styles, mixins, variables, etc.) and what kind of dependencies it is allowed:

| Directory    | Description                                     | Provides  | Dependencies          |
| ------------ | ----------------------------------------------- | --------- | --------------------- |
| `base`       | Global reset styles: element styles, typography | styles    | mixins, variables[^1] |
| `components` | Styles for shared components                    | styles    | any                   |
| `mixins`     | Mixins                                          | mixins    | mixins[^2], variables |
| `util`       | Utility styles                                  | styles    | mixins                |
| `variables`  | Variables                                       | variables | none                  |

Directories whose modules provide styles should contain an entry-point module (`index.scss`) for the convenience of consumers.

## Conventions

### Selectors and Class naming

We use [BEM (Block Element Modifier)](http://getbem.com/) methodology for class naming.

- `base` modules should use element selectors (no class names).
- Component class names should use PascalCase, e.g. `.HelpPanel`. All other classnames require a .`hyp-` prefix.
- All utility and pattern classnames should be prefixed with `.hyp-`.
- Atomic-level utility classes should be prefixed with `.hyp-u-`, e.g. `.hyp-u-border--left`. These are classes that may be used additively to adjust styling on a single element.
- Composite (molecule, organism) class names do not require `u`-prefixes, but should be lower-case, e.g. `.hyp-frame`.

### Variables

- To help manage dependencies, it is a friendly touch to assign variables to local members[^3] near the top of modules that have variable dependencies, e.g.:

  `$-color-border: var.$color-border;`

  And then make use of `$-color-border` in the module. This helps make it easier to understand a member's scope when scanning longer modules and helps with dependency maintenance.

- Module imports should be ordered "outward-in" and alphabetized, with SASS builtins, then third-party imports first, e.g.

  ```sass
  @use 'sass:map';

  @use 'some-third-party-thing';

  @use '../variables' as var;

  @use 'a-local-partial';
  @use 'b-local-partial';
  ```

  Modules that output styles may `@use` modules in the order needed for correct cascade, however.

[^1]: Variable dependencies: sparingly. Ideally, not.
[^2]: Atomic mixin modules build on each other, and as such, `molecules` may depend on `atoms`, etc. Non-atomic mixin modules should not depend on other mixins.
[^3]: Members prefixed with `-` are considered "private" by SASS
