import { render } from 'preact';

import arrowLeftIcon from '../../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../../images/icons/arrow-right.svg';
import {
  SvgIcon,
  availableIcons,
  registerIcons,
  registerIcon,
} from '../SvgIcon';

describe('SvgIcon', () => {
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
    registerIcons(
      {
        'arrow-left': arrowLeftIcon,
        'arrow-right': arrowRightIcon,
      },
      { reset: true }
    );
  });

  afterEach(() => {
    for (const [name, icon] of savedIconSet) {
      registerIcon(name, icon);
    }
  });

  it("sets the element's content to the content of the SVG", () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" />, container);
    assert.ok(container.querySelector('svg'));
  });

  it('throws an error if the icon name is not registered', () => {
    assert.throws(() => {
      const container = document.createElement('div');
      render(<SvgIcon name="unknown" />, container);
    }, 'Icon "unknown" is not registered');
  });

  it('does not set the class of the SVG by default', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" />, container);
    const svg = container.querySelector('svg');
    assert.equal(svg.getAttribute('class'), '');
  });

  it('sets the class of the SVG if provided', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" className="thing__icon" />, container);
    const svg = container.querySelector('svg');
    assert.equal(svg.getAttribute('class'), 'thing__icon');
  });

  it('retains the CSS class if the icon changes', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" className="thing__icon" />, container);
    render(<SvgIcon name="arrow-right" className="thing__icon" />, container);
    const svg = container.querySelector('svg');
    assert.equal(svg.getAttribute('class'), 'thing__icon');
  });

  it('sets a default class on the wrapper element', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" />, container);
    const wrapper = container.querySelector('span');
    assert.isTrue(wrapper.classList.contains('Hyp-SvgIcon'));
    assert.isFalse(wrapper.classList.contains('Hyp-SvgIcon--inline'));
  });

  it('appends an inline class to wrapper if `inline` prop is `true`', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" inline={true} />, container);
    const wrapper = container.querySelector('span');
    assert.isTrue(wrapper.classList.contains('Hyp-SvgIcon'));
    assert.isTrue(wrapper.classList.contains('Hyp-SvgIcon--inline'));
  });

  it('sets a title to the containing `span` element if `title` is present', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" title="Open menu" />, container);
    const wrapper = container.querySelector('span');
    assert.equal(wrapper.getAttribute('title'), 'Open menu');
  });

  it('sets does not set a title on the containing `span` element if `title` not present', () => {
    const container = document.createElement('div');
    render(<SvgIcon name="arrow-left" />, container);
    const wrapper = container.querySelector('span');
    assert.notOk(wrapper.getAttribute('title'));
  });
});
