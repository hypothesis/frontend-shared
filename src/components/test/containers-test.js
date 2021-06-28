import { mount } from 'enzyme';

import { Frame, Card, Actions } from '../containers';

describe('Frame', () => {
  const createComponent = (props = {}) =>
    mount(
      <Frame {...props}>
        <div>This is content inside of a frame</div>
      </Frame>
    );

  it('renders children inside of a div with appropriate classnames', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('div').first().hasClass('Hyp-Frame'));
  });

  it('applies extra classes', () => {
    createComponent({ classes: 'foo bar' });

    assert.exists('div.Hyp-Frame.foo.bar');
  });
});

describe('Card', () => {
  const createComponent = (props = {}) =>
    mount(
      <Card {...props}>
        <div>This is content inside of a card</div>
      </Card>
    );

  it('renders children inside of a div with appropriate classnames', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('div').first().hasClass('Hyp-Card'));
  });

  it('applies extra classes', () => {
    createComponent({ classes: 'foo bar' });

    assert.exists('div.Hyp-Card.foo.bar');
  });
});

describe('Actions', () => {
  const createComponent = (props = {}) =>
    mount(
      <Actions {...props}>
        <div>This is content inside of Actions</div>
      </Actions>
    );

  it('renders children inside of a div with appropriate classnames', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('div').first().hasClass('Hyp-Actions--row'));
  });

  it('applies extra classes', () => {
    createComponent({ classes: 'foo bar' });

    assert.exists('div.Hyp-Actions--row.foo.bar');
  });

  it('applies columnar layout if `direction` is `column`', () => {
    createComponent({ direction: 'column' });

    assert.exists('div.Hyp-Actions--column');
  });
});
