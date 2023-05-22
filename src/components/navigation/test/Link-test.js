import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import Link from '../Link';

describe('Link', () => {
  testPresentationalComponent(Link, { componentName: 'Link' });
  testStyledComponent(Link, { supportedProps: ['variant', 'unstyled'] });
});
