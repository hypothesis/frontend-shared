import { Link } from '../../';
import Library from './Library';

export default function LibraryHome() {
  return (
    <Library.Page
      title="Pattern Library"
      intro={
        <p>
          This pattern library documents the shared UI components available to
          Hypothesis front-end applications.
        </p>
      }
    >
      <ul>
        <li>
          <strong>Foundations</strong> document how to use components in this
          library, as well as core design patterns like colors and
          component-independent utilities.
        </li>
        <li>
          <strong>Components</strong> document the{' '}
          <Link underline="always" href="https://preactjs.com/">
            Preact
          </Link>{' '}
          components that make up this {"package's"} core content.
        </li>
      </ul>
    </Library.Page>
  );
}
