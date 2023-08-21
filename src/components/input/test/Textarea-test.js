import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import Textarea from '../Textarea';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test textarea" {...props} />);
};

describe('Textarea', () => {
  testPresentationalComponent(Textarea, { createContent: contentFn });
});
