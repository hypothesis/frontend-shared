import { Link } from '../../../';
import Library from '../Library';

export default function LinkComponents() {
  return (
    <Library.Page title="Links">
      <Library.Pattern title="Link">
        <p>
          <code>Link</code> components provide some common styling and attribute
          for anchor (<code>a</code>) elements.
        </p>
        <Library.Example>
          <Library.Demo withSource>
            <Link href="https://www.example.com">A link to somewhere</Link>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
