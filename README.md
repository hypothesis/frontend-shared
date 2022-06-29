# Shared resources for Hypothesis front-end applications

A package of resources for Hypothesis front-end applications.

## Requirements

Your project must have Preact installed as a dependency.

`npm install --save preact`

## Usage

```
$ npm install @hypothesis/frontend-shared --save
```

### Components (preact)

```js
import { LabeledButton } from '@hypothesis/frontend-shared';
```

### Icons

```js
import {
  profile,
  share,
  trash,
} from '@hypothesis/frontend-shared/lib/icons';

import { registerIcons } from '@hypothesis/frontend-shared';

registerIcons({ profile, shareAnnotation: share, trash});

export default function MyComponent() => {
  return (
    <div>
      <Icon name="profile" />
      <Icon name="shareAnnotation" />
    </div>
  );
```

### Styling (CSS)

Your project must have `sass` and `tailwindcss` dependencies installed.

To add styles for all shared components to your project's SASS:

```scss
@use '@hypothesis/frontend-shared/styles';
```

## Additional documentation

- [Development guide](docs/developing.md)
- [Release guide](docs/releases.md)
