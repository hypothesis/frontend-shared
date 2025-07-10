import type { ComponentChildren, FunctionalComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';

export type LazyOptions<P> = {
  /** Returns the content to render if the component is not yet loaded. */
  fallback: (props: P) => ComponentChildren;
  /** Returns the content to render if the component failed to load. */
  errorFallback?: (props: P, err: Error) => ComponentChildren;
};

/**
 * Create a lazy-loading version of a component.
 *
 * This utility allows deferring loading the code for a component until it is
 * rendered. The returned component loads in two phases. In the first phase a
 * placeholder is rendered and the {@link load} callback is invoked to load
 * the component. Then when the returned promise resolves, the placeholder is
 * replaced with the real compoonent.
 *
 * @param displayName - Display name for the lazy wrapper component
 * @param load - A function which loads the JS component. This will usually
 *   be an async function which does `import('path/to/module')` and then returns
 *   one of the loaded module's exports.
 * @param options - Options that specify what to render while the component is
 *   loading or if it fails to load.
 */
export function lazy<P>(
  displayName: string,
  load: () => Promise<FunctionalComponent<P>>,
  { errorFallback, fallback }: LazyOptions<P>,
) {
  function Lazy(props: P & JSX.IntrinsicAttributes) {
    const [component, setComponent] = useState<FunctionalComponent<P>>();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    if (error) {
      return errorFallback ? (
        errorFallback(props, error)
      ) : (
        <div>
          <p>
            There was a problem loading this content. Try refreshing the page.
          </p>
          <b>Details:</b> {error.message}
        </div>
      );
    }
    if (!component && !loading) {
      setLoading(true);
      load()
        .then(component => {
          setComponent(() => component);
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    }
    if (component) {
      const Component = component;
      return <Component {...props} />;
    }
    return fallback(props);
  }

  Lazy.displayName = `Lazy(${displayName})`;
  return Lazy;
}
