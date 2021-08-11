import { Fragment } from 'preact';
import { useState } from 'preact/hooks';

import { LabeledButton, Table } from '../../../';

import Library from '../Library';

import { sampleTableContent } from './samples';

const renderCallback = file => (
  <Fragment>
    <td>{file.displayName}</td>
    <td>{file.updated}</td>
  </Fragment>
);

const { tableHeaders, items } = sampleTableContent();

function TableExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    /** @type {null|object} */ (null)
  );

  return (
    <Library.Example title="Basic Table" variant="wide">
      <p>
        A <code>Table</code> will fill available space if none of its ancestors
        apply any constraints on height or width. It will fill 100% of its
        available space horizontally, and take up all the vertical space it
        needs. In this case, it will change vertical size during loading.
      </p>
      <Library.Demo>
        <div className="hyp-u-padding--5">
          <LabeledButton onClick={() => setIsLoading(!isLoading)}>
            Toggle Loading
          </LabeledButton>
        </div>
        <Table
          accessibleLabel="File list"
          isLoading={isLoading}
          items={items}
          selectedItem={selectedFile}
          onSelectItem={file => setSelectedFile(file)}
          onUseItem={file => alert(`Selected ${file.displayName}`)}
          renderItem={file => renderCallback(file)}
          tableHeaders={tableHeaders}
        />
      </Library.Demo>
    </Library.Example>
  );
}

function ScrollboxTableExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    /** @type {null|object} */ (items[items.length - 1])
  );

  return (
    <Library.Example title="Constrained Table" variant="wide">
      <p>
        <code>Tables</code> render inside of a <code>Scrollbox</code> container
        component, which gives the table a scroll context and allows it to
        scroll if it overflows. Apply height/width constraints to an appropriate
        parent elements to enable this. Height will not change when loading.
      </p>
      <p>In this example, the last item in the table is pre-selected.</p>
      <Library.Demo withSource>
        <div className="hyp-u-padding--5">
          <LabeledButton onClick={() => setIsLoading(!isLoading)}>
            Toggle Loading
          </LabeledButton>
        </div>
        <div
          className="hyp-u-layout-column hyp-u-padding--3"
          style="max-height:300px;height:300px;"
        >
          <Table
            accessibleLabel="File list"
            isLoading={isLoading}
            items={isLoading ? [] : items}
            selectedItem={selectedFile}
            onSelectItem={file => setSelectedFile(file)}
            onUseItem={file => alert(`Selected ${file.displayName}`)}
            renderItem={file => renderCallback(file)}
            tableHeaders={tableHeaders}
          />
        </div>
      </Library.Demo>
    </Library.Example>
  );
}

export default function TableComponents() {
  return (
    <Library.Page title="Table">
      <Library.Pattern title="Table">
        <TableExample />
        <ScrollboxTableExample />
      </Library.Pattern>
    </Library.Page>
  );
}
