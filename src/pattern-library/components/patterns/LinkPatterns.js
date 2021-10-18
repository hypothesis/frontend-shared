import Library from '../Library';

export default function LinkPatterns() {
  return (
    <Library.Page title="Links">
      <Library.Pattern title="Link">
        <p>
          The link pattern for <code>{'<a>'}</code> tags uses brand red and no
          underline, as well as a rounded keyboard focus ring.
        </p>
        <Library.Example>
          <Library.Demo withSource>
            <a className="hyp-link" href="http://www.example.com">
              This is a link
            </a>
            <a className="hyp-link" href="http://www.example.com">
              This is another link
            </a>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
