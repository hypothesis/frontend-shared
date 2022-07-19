import { Link } from '../..';
import Library from './Library';

export default function LibraryHome() {
  return (
    <Library.Page title="Pattern Library">
      <p>
        This pattern library demonstrates UI toolkit components and how to use
        them.
      </p>

      <Library.Pattern title="Foundations">
        <p>
          <strong>Foundations</strong> are the core design system
          elements—colors, spacing systems, typography—that define the
          underlying design fundamentals in Hypothesis UI.
        </p>
      </Library.Pattern>

      <Library.Pattern title="Components">
        <ul>
          <li>
            <strong>Components</strong> are{' '}
            <Link href="https://preactjs.com/">Preact</Link> components that use{' '}
            <Link href="https://tailwindcss.com/">Tailwind CSS</Link> for
            styling. Usage of these, or migration to them, is preferred over
            legacy components.
          </li>
          <li>
            <strong>Legacy components</strong> are{' '}
            <Link href="https://preactjs.com/">Preact</Link> components that use{' '}
            <Link href="https://sass-lang.com/">SASS</Link> for styling.
          </li>
        </ul>
      </Library.Pattern>

      <Library.Pattern title="Patterns (deprecated)">
        <p>
          <strong>Patterns</strong> are modular implementations of the design
          system <strong>foundations</strong>—from the atomic to the complex.
          These implementations are in HTML and CSS.
        </p>
      </Library.Pattern>
    </Library.Page>
  );
}
