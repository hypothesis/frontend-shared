import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import Select from '../Select';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test input" {...props} />);
};

describe('Select', () => {
  testPresentationalComponent(Select, { createContent: contentFn });
});
