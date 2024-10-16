import hypothesis from 'eslint-config-hypothesis';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.yalc/**', 'lib/**', 'build/**'],
  },
  ...hypothesis,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      // Replaced by TypeScript's static checking.
      'react/prop-types': 'off',
      // Upgrade TS rules from warning to error.
      '@typescript-eslint/no-unused-vars': 'error',

      // Disable TS rules that we dislike.
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-this-alias': 'off',

      // Enforce consistency in cases where TypeScript supports old and new
      // syntaxes for the same thing.
      //
      // - Require `<var> as <type>` for casts
      // - Require `import type` for type imports. The corresponding rule for
      //   exports is not enabled yet because that requires setting up
      //   type-aware linting.
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Icons
  {
    files: ['src/components/icons/*.tsx'],
    rules: {
      // preact uses kebab-cased SVG element attributes, which look like
      // unknown properties to `eslint-plugin-react` (React uses camelCase
      // for these properties)
      'react/no-unknown-property': 'off',
    },
  },

  // Scripts
  {
    files: ['scripts/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
