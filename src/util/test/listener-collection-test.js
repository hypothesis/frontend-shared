import { ListenerCollection } from '../listener-collection';

describe('ListenerCollection', () => {
  let listeners;

  beforeEach(() => {
    listeners = new ListenerCollection();
  });

  afterEach(() => {
    listeners.removeAll();
  });

  describe('#add', () => {
    it('registers and triggers event listener', () => {
      const listener = sinon.stub();
      listeners.add(window, 'resize', listener);

      window.dispatchEvent(new Event('resize'));
      assert.calledOnce(listener);
    });
  });

  describe('#remove', () => {
    it('unregisters the specified listener', () => {
      const listener1 = sinon.stub();
      const listener2 = sinon.stub();
      const listener3 = sinon.stub();
      listeners.add(window, 'resize', listener1);
      const listenerId = listeners.add(window, 'resize', listener2);
      const capturePhaseListenerId = listeners.add(
        window,
        'resize',
        listener3,
        {
          capture: true,
        },
      );
      listeners.remove(listenerId);
      listeners.remove(capturePhaseListenerId);

      window.dispatchEvent(new Event('resize'));
      assert.calledOnce(listener1);
      assert.notCalled(listener2);
      assert.notCalled(listener3);
    });
  });

  describe('#removeAll', () => {
    it('unregisters all event listeners', () => {
      const listener1 = sinon.stub();
      const listener2 = sinon.stub();
      const listener3 = sinon.stub();
      listeners.add(window, 'resize', listener1);
      listeners.add(window, 'resize', listener2);
      listeners.add(window, 'resize', listener3, {
        capture: true,
      });
      listeners.removeAll();

      window.dispatchEvent(new Event('resize'));
      assert.notCalled(listener1);
      assert.notCalled(listener2);
      assert.notCalled(listener3);
    });
  });
});
