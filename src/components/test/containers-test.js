import { mount } from 'enzyme';

import { Frame, Card, Actions, Scrollbox } from '../containers';

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
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('div.Hyp-Frame.foo.bar').exists());
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
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('div.Hyp-Card.foo.bar').exists());
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
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('div.Hyp-Actions--row.foo.bar').exists());
  });

  it('applies columnar layout if `direction` is `column`', () => {
    const wrapper = createComponent({ direction: 'column' });

    assert.isTrue(wrapper.find('div.Hyp-Actions--column').exists());
  });
});

describe('Scrollbox', () => {
  const createComponent = (props = {}) =>
    mount(
      <Scrollbox {...props}>
        <div>This is content inside of a Scrollbox</div>
      </Scrollbox>
    );

  it('renders children inside of a div with appropriate classnames', () => {
    const wrapper = createComponent();

    assert.isTrue(wrapper.find('.Hyp-Scrollbox').exists());
  });

  it('applies extra classes', () => {
    const wrapper = createComponent({ classes: 'foo bar' });

    assert.isTrue(wrapper.find('div.Hyp-Scrollbox.foo.bar').exists());
  });

  it('applies header-affordance layout class if `withHeader`', () => {
    const wrapper = createComponent({ withHeader: true });

    assert.isTrue(wrapper.find('div.Hyp-Scrollbox--with-header').exists());
  });
});
