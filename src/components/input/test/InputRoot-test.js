import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import InputRoot from '../InputRoot';

const contentFn = (Component, props = {}) => {
  return mount(<Component aria-label="Test input" {...props} />);
};

describe('InputRoot', () => {
  testPresentationalComponent(InputRoot, { createContent: contentFn });

  it('should warn in console if accessibility attributes are missing', () => {
    sinon.stub(console, 'warn');

    mount(<InputRoot placeholder="..." />);

    assert.calledWith(
      console.warn,
      '`Input` component should have either an `id` or an `aria-label` attribute',
    );

    console.warn.restore();
  });
});
