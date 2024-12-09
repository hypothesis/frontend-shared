import { checkAccessibility, mount } from '@hypothesis/frontend-testing';

import Pagination, { $imports } from '../Pagination';

describe('Pagination', () => {
  let fakeOnChangePage;
  let fakePageNumberOptions;

  const findButton = (wrapper, title) =>
    wrapper.find('button').filterWhere(n => n.props().title === title);

  const createComponent = (props = {}) => {
    return mount(
      <Pagination
        currentPage={1}
        onChangePage={fakeOnChangePage}
        totalPages={10}
        {...props}
      />,
    );
  };

  beforeEach(() => {
    fakeOnChangePage = sinon.stub();
    fakePageNumberOptions = sinon.stub().returns([1, 2, 3, 4, null, 10]);

    $imports.$mock({
      '../../util/pagination': { pageNumberOptions: fakePageNumberOptions },
    });
  });

  afterEach(() => {
    $imports.$restore();
  });

  describe('prev button', () => {
    it('should render enabled prev button when there are previous pages to show', () => {
      const wrapper = createComponent({ currentPage: 2 });
      const button = findButton(wrapper, 'Go to previous page');
      assert.isFalse(button.find('button').hasClass('invisible'));
      assert.isFalse(button.prop('disabled'));
    });

    it('should render disabled prev button if there are no previous pages to show', () => {
      const wrapper = createComponent({ currentPage: 1 });
      const button = findButton(wrapper, 'Go to previous page');
      assert.isTrue(button.find('button').hasClass('invisible'));
      assert.isTrue(button.prop('disabled'));
    });

    it('should invoke the onChangePage callback when clicked', () => {
      const wrapper = createComponent({ currentPage: 2 });
      const button = findButton(wrapper, 'Go to previous page');
      button.simulate('click');
      assert.calledWith(fakeOnChangePage, 1);
    });

    it('should remove focus from button after clicked', () => {
      const wrapper = createComponent({ currentPage: 2 });
      const button = findButton(wrapper, 'Go to previous page');
      const buttonEl = button.getDOMNode();
      const blurSpy = sinon.spy(buttonEl, 'blur');

      button.simulate('click');

      assert.equal(blurSpy.callCount, 1);
    });
  });

  describe('next button', () => {
    it('should render enabled button when there are further pages to show', () => {
      const wrapper = createComponent({ currentPage: 1 });
      const button = findButton(wrapper, 'Go to next page');
      assert.isFalse(button.find('button').hasClass('invisible'));
      assert.isFalse(button.prop('disabled'));
    });

    it('should render disabled next button if there are no further pages to show', () => {
      const wrapper = createComponent({ currentPage: 10 });
      const button = findButton(wrapper, 'Go to next page');
      assert.isTrue(button.find('button').hasClass('invisible'));
      assert.isTrue(button.prop('disabled'));
    });

    it('should invoke the `onChangePage` callback when clicked', () => {
      const wrapper = createComponent({ currentPage: 1 });
      const button = findButton(wrapper, 'Go to next page');
      button.simulate('click');
      assert.calledWith(fakeOnChangePage, 2);
    });

    it('should remove focus from button after clicked', () => {
      const wrapper = createComponent({ currentPage: 1 });
      const button = findButton(wrapper, 'Go to next page');
      const buttonEl = button.getDOMNode();
      const blurSpy = sinon.spy(buttonEl, 'blur');

      button.simulate('click');

      assert.equal(blurSpy.callCount, 1);
    });
  });

  describe('page number buttons', () => {
    it('should render buttons for each page number available', () => {
      fakePageNumberOptions.returns([1, 2, 3, 4, null, 10]);
      const wrapper = createComponent();

      [1, 2, 3, 4, 10].forEach(pageNumber => {
        const button = findButton(wrapper, `Go to page ${pageNumber}`);
        assert.isTrue(button.exists());
      });

      // There is one "gap":
      assert.equal(wrapper.find('[data-testid="pagination-gap"]').length, 1);
    });

    it('should invoke the onChangePage callback when page number button clicked', () => {
      fakePageNumberOptions.returns([1, 2, 3, 4, null, 10]);
      const wrapper = createComponent();

      [1, 2, 3, 4, 10].forEach(pageNumber => {
        const button = findButton(wrapper, `Go to page ${pageNumber}`);
        button.simulate('click');
        assert.calledWith(fakeOnChangePage, pageNumber);
      });
    });
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createComponent({ currentPage: 2 }),
    }),
  );
});
