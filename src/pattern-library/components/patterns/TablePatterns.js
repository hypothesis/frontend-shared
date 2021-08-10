import Library from '../Library';

import { SampleTBody } from './samples';

export default function TablePatterns() {
  return (
    <Library.Page title="Tables">
      <p>
        These <code>table</code> patterns support a basic table layout that
        adapts to available space. They are intended for simpler tabular
        display: maximum 2 or possibly 3 columns. Remember that{' '}
        <code>table</code> content needs to be usable in tight and narrow
        spaces.
      </p>
      <Library.Pattern title="Table">
        <Library.Example title="Basic table" variant="wide">
          <p>
            By default, a <code>table</code> will fill available horizontal
            space, and will use whatever height is needed to render its rows.{' '}
            <code>tr.is-selected</code> styles a row as selected.
          </p>

          <Library.Demo withSource>
            <table className="hyp-table">
              <thead>
                <tr>
                  <th scope="col">Column A</th>
                  <th scope="col">Column B</th>
                </tr>
              </thead>
              <SampleTBody />
            </table>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Adjusting column widths">
          <p>
            Table column widths may be adjusted by styling <code>thead th</code>{' '}
            elements. In this example, the column widths are set to 30% and 70%.
          </p>
          <Library.Demo withSource>
            <table className="hyp-table">
              <thead>
                <tr>
                  <th scope="col" style="width:30%">
                    Column A
                  </th>
                  <th scope="col" style="width:70%">
                    Column B
                  </th>
                </tr>
              </thead>
              <SampleTBody />
            </table>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Constraining with a scrollbox">
          <p>
            In this example, the <code>table</code> is constrained within a{' '}
            <code>scrollbox</code> with a <code>max-height</code>.
          </p>
          <Library.Demo withSource>
            <div
              style="max-height:250px"
              className="hyp-scrollbox--with-header"
            >
              <table className="hyp-table">
                <thead>
                  <tr>
                    <th scope="col">Column A</th>
                    <th scope="col">Column B</th>
                  </tr>
                </thead>
                <SampleTBody />
              </table>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
