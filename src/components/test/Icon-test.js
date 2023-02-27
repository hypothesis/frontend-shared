import { render } from 'preact';

import * as iconSrc from '../../icons';
import { Icon } from '../Icon';
import { availableIcons, registerIcons, registerIcon } from '../SvgIcon';

describe('Icon', () => {
  // Tests here use DOM APIs rather than Enzyme because SvgIcon uses
  // `dangerouslySetInnerHTML` for its content, and that is not visible in the
  // Enzyme tree.

  // Global icon set that is registered with `SvgIcon` outside of these tests.
  let savedIconSet;

  before(() => {
    // Clone the returned Map so that we're not affected by changes to the
    // Map it references
    savedIconSet = new Map(availableIcons());
  });

  beforeEach(() => {
    // Clear out any registered icons
    registerIcons({}, { reset: true });
  });

  afterEach(() => {
    // Clear out any icons registered by these tests
    registerIcons({}, { reset: true });
    // Replace pre-existing registered icons
    for (const [name, icon] of savedIconSet) {
      registerIcon(name, icon);
    }
  });

  it("sets the element's content to the content of the SVG", () => {
    const container = document.createElement('div');
    const fakeIcon = registerIcon('fake', iconSrc.edit);
    render(<Icon name={fakeIcon} />, container);
    const svg = container.querySelector('svg');
    assert.ok(svg);
    assert.equal(svg.getAttribute('class'), 'Hyp-Icon');
  });

  it('throws an error if the icon name is not registered', () => {
    assert.throws(() => {
      const container = document.createElement('div');
      render(<Icon name="unknown" />, container);
    }, 'Icon "unknown" is not registered');
  });

  it('adds extra SVG classes if provided', () => {
    const container = document.createElement('div');
    const fakeIcon = registerIcon('fake', iconSrc.edit);

    render(<Icon name={fakeIcon} classes="thing" />, container);

    const svg = container.querySelector('svg');
    assert.equal(svg.getAttribute('class'), 'Hyp-Icon thing');
  });

  it('adds extra wrapper classes if provided', () => {
    const container = document.createElement('div');
    const fakeIcon = registerIcon('fake', iconSrc.edit);

    render(<Icon name={fakeIcon} containerClasses="my-class" />, container);
    const wrapper = container.querySelector('span');
    assert.isTrue(wrapper.classList.contains('my-class'));
  });

  it('sets a title to the containing `span` element if `title` is present', () => {
    const container = document.createElement('div');
    const fakeIcon = registerIcon('fake', iconSrc.edit);

    render(<Icon name={fakeIcon} title="Open menu" />, container);
    const wrapper = container.querySelector('span');
    assert.equal(wrapper.getAttribute('title'), 'Open menu');
  });
});
