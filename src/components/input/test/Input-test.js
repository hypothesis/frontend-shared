import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import Input from '../Input';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test input" {...props} />);
};

describe('Input', () => {
  testPresentationalComponent(Input, { createContent: contentFn });
});
