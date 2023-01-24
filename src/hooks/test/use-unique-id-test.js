import { mount } from 'enzyme';

import { useUniqueId } from '../use-unique-id';

function Widget() {
  const varietyId = useUniqueId('banana-variety');
  const deliciousId = useUniqueId('delicious');
  return (
    <>
      <label data-testid="variety-label" htmlFor={varietyId}>
        Banana variety
      </label>
      <input data-testid="variety-input" type="text" id={varietyId} />
      <label data-testid="delicious-label" htmlFor={deliciousId}>
        Level of deliciousness
      </label>
      <input data-testid="delicious-input" type="text" id={deliciousId} />
    </>
  );
}

describe('useUniqueId', () => {
  it('should prefix generated IDs', () => {
    const wrapper = mount(<Widget />);

    assert.match(
      wrapper
        .find('[data-testid="variety-label"]')
        .getDOMNode()
        .getAttribute('for'),
      /^banana-variety-[0-9]/
    );

    assert.match(
      wrapper
        .find('[data-testid="variety-input"]')
        .getDOMNode()
        .getAttribute('id'),
      /^banana-variety-[0-9]/
    );

    assert.match(
      wrapper
        .find('[data-testid="delicious-input"]')
        .getDOMNode()
        .getAttribute('id'),
      /^delicious-[0-9]/
    );
  });

  it('should provide unique IDs for multiple components', () => {
    const wrapper1 = mount(<Widget />);
    const wrapper2 = mount(<Widget />);

    const id1 = wrapper1
      .find('[data-testid="delicious-input"]')
      .getDOMNode()
      .getAttribute('id');

    const id2 = wrapper2
      .find('[data-testid="delicious-input"]')
      .getDOMNode()
      .getAttribute('id');

    assert.notEqual(id1, id2);
  });
});
