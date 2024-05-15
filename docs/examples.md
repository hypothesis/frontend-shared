# Adding code examples

Component library documentation frequently needs to show interactive examples, along with the code for them.

Manually writing those code snippets has some issues: they are not covered by your type checking and linting tasks, and they can accidentally get outdated.

The web-based documentation included with this library allows to create example files which are both used as regular modules that can be imported for interactive examples, but also read as plain text to generate their corresponding code snippet.

These files are type-checked, formatted and linted like any other source files, and the code snippet will always be in sync with the interactive example.

## Using example files

When you want to create a code example, add a file with the name of your choice inside `src/pattern-library/examples` directory.

You can then reference this file from the web-based pattern library, passing the `exampleFile` prop to the `<Library.Demo />` component.

```tsx
<Library.Demo exampleFile="some-example-file-name" />
```

## Considerations

There are some considerations and limitations when working with example files.

- They all need to have the `tsx` extension.
- Nested directories are not supported, so it's a good idea to add contextual prefixes to example files. For example, all files related with `SelectNext` can be prefixed with `select-next` to make sure they are all grouped together.
- Example files need to have a Preact component as their default export.
- When generating the source code snippet, import statements are stripped out, to avoid internal module references which are not relevant for the library consumers.
