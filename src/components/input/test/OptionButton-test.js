import { mount } from '@hypothesis/frontend-testing';

import { testSimpleComponent } from '../../test/common-tests';
import OptionButton from '../OptionButton';

describe('OptionButton', () => {
  const createComponent = (props = {}) => {
    return mount(
      <OptionButton {...props}>
        This is content inside of a Button
      </OptionButton>,
    );
  };

  testSimpleComponent(OptionButton);

  it('applies appropriate ARIA attributes for button state', () => {
    const pressed = createComponent({ pressed: true });
    const selected = createComponent({ selected: true });

    assert.equal(
      pressed.find('button').getDOMNode().getAttribute('aria-pressed'),
      'true',
    );
    assert.equal(
      selected.find('button').getDOMNode().getAttribute('aria-pressed'),
      'true',
    );
  });

  it('renders optional details content', () => {
    const noDetails = createComponent();
    const withDetails = createComponent({ details: 'PDF' });

    function getDetails(wrapper) {
      return wrapper.find('[data-testid="option-button-details"]');
    }

    assert.isNotOk(getDetails(noDetails).exists());
    const details = getDetails(withDetails);
    assert.isOk(details);
    assert.equal(details.text(), 'PDF');
  });
});
