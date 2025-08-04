import { delay, mount } from '@hypothesis/frontend-testing';

import { lazy } from '../lazy';

describe('lazy', () => {
  let fakeComponent;
  let fakeLoader;
  let LazyComponent;

  beforeEach(() => {
    fakeComponent = ({ text }) => (
      <div data-testid="loaded-component">{text}</div>
    );
    fakeLoader = sinon.stub();
    LazyComponent = lazy('TestComponent', fakeLoader, {
      fallback: ({ text }) => <div data-testid="fallback">{text}</div>,
      errorFallback: ({ text }, error) => (
        <div data-testid="error-fallback">
          {text} - Error: {error.message}
        </div>
      ),
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders fallback initially', () => {
    fakeLoader.returns(Promise.resolve(fakeComponent));
    const wrapper = mount(<LazyComponent text="test" />);

    assert.isTrue(wrapper.exists('[data-testid="fallback"]'));
    assert.equal(wrapper.find('[data-testid="fallback"]').text(), 'test');
  });

  it('renders loaded component after loading completes', async () => {
    fakeLoader.returns(Promise.resolve(fakeComponent));
    const wrapper = mount(<LazyComponent text="test" />);

    // Initially shows fallback
    assert.isTrue(wrapper.exists('[data-testid="fallback"]'));
    assert.isFalse(wrapper.exists('[data-testid="loaded-component"]'));

    // Wait for component to load
    await delay(0);
    wrapper.update();

    // Now shows loaded component
    assert.isFalse(wrapper.exists('[data-testid="fallback"]'));
    assert.isTrue(wrapper.exists('[data-testid="loaded-component"]'));
    assert.equal(
      wrapper.find('[data-testid="loaded-component"]').text(),
      'test',
    );
  });

  it('supports load callback returning a module', async () => {
    fakeLoader.returns(Promise.resolve({ default: fakeComponent }));
    const wrapper = mount(<LazyComponent text="test" />);

    // Wait for component to load
    await delay(0);
    wrapper.update();

    assert.isTrue(wrapper.exists('[data-testid="loaded-component"]'));
  });

  it('passes props to loaded component', async () => {
    fakeLoader.returns(Promise.resolve(fakeComponent));
    const wrapper = mount(<LazyComponent text="test" customProp="value" />);

    await delay(0);
    wrapper.update();

    const loadedComponent = wrapper.find('[data-testid="loaded-component"]');
    assert.equal(loadedComponent.text(), 'test');
    // The component should receive all props passed to the lazy wrapper
    assert.equal(loadedComponent.parent().prop('customProp'), 'value');
  });

  it('renders error fallback when loading fails', async () => {
    const error = new Error('Loading failed');
    fakeLoader.returns(Promise.reject(error));
    const wrapper = mount(<LazyComponent text="test" />);

    // Initially shows fallback
    assert.isTrue(wrapper.exists('[data-testid="fallback"]'));

    // Wait for loading to fail
    await delay(0);
    wrapper.update();

    // Now shows error fallback
    assert.isFalse(wrapper.exists('[data-testid="fallback"]'));
    assert.isTrue(wrapper.exists('[data-testid="error-fallback"]'));
    assert.equal(
      wrapper.find('[data-testid="error-fallback"]').text(),
      'test - Error: Loading failed',
    );
  });

  it('renders default error fallback when `errorFallback` is not provided', async () => {
    const error = new Error('Loading failed');
    fakeLoader.returns(Promise.reject(error));

    const LazyComponentWithoutErrorFallback = lazy(
      'TestComponent',
      fakeLoader,
      {
        fallback: ({ text }) => <div data-testid="fallback">{text}</div>,
      },
    );

    const wrapper = mount(<LazyComponentWithoutErrorFallback text="test" />);

    // Wait for loading to fail
    await delay(0);
    wrapper.update();

    assert.isTrue(
      wrapper.text().includes('There was a problem loading this content'),
    );
    assert.isTrue(wrapper.text().includes('Loading failed'));
  });

  it('does not call loader again if re-rendered while loading', async () => {
    fakeLoader.returns(Promise.resolve(fakeComponent));
    const wrapper = mount(<LazyComponent text="test" />);

    // Re-render component before loader result has been processed.
    wrapper.setProps({ text: 'updated' });

    assert.calledOnce(fakeLoader);
  });

  it('sets displayName on the returned component', () => {
    assert.equal(LazyComponent.displayName, 'Lazy(TestComponent)');
  });
});
