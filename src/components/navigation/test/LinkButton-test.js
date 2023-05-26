import {
  testPresentationalComponent,
  testStyledComponent,
} from '../../test/common-tests';
import LinkButton from '../LinkButton';

describe('LinkButton', () => {
  testPresentationalComponent(LinkButton);
  testStyledComponent(LinkButton, { supportedProps: ['unstyled', 'variant'] });
});
