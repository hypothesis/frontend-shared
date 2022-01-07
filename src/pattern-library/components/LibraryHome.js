import { Link } from '../..';
import Library from './Library';

export default function LibraryHome() {
  return (
    <Library.Page title="Pattern Library">
      <p>
        This pattern library demonstrates foundations, patterns and components
        that can be used in Hypothesis front-end applications.
      </p>

      <h2>Foundations</h2>

      <p>
        <strong>Foundations</strong> are the core design system elements—colors,
        spacing systems, typography—that define the underlying design
        fundamentals in Hypothesis UI.
      </p>

      <p>They exist independently of implementation.</p>

      <h2>Patterns</h2>

      <p>
        <strong>Patterns</strong> are modular implementations of the design
        system <strong>foundations</strong>—from the atomic to the complex.
        These implementations are in HTML and CSS.
      </p>

      <h2>Components</h2>

      <p>
        <strong>Components</strong> are{' '}
        <Link href="https://preactjs.com/">Preact</Link> components that are
        built using underlying <strong>patterns</strong>.
      </p>
    </Library.Page>
  );
}
