import { useState } from 'preact/hooks';

import { LabeledButton, Table } from '../../../';

import Library from '../Library';

import { sampleTableContent } from './samples';

const renderCallback = file => (
  <>
    <td>{file.displayName}</td>
    <td>{file.updated}</td>
  </>
);

const customizedRenderCallback = file => (
  <>
    <td className="text-grey-6">{file.displayName}</td>
    <td>{file.updated}</td>
  </>
);

const { tableHeaders, items } = sampleTableContent();

function TableExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    /** @type {null|object} */ (null)
  );

  return (
    <Library.Example title="Basic Table">
      <p>
        A <code>Table</code> will fill available space if none of its ancestors
        apply any constraints on height or width. It will fill 100% of its
        available space horizontally, and take up all the vertical space it
        needs. In this case, it will change vertical size during loading.
      </p>
      <Library.Demo>
        <div className="p-5">
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
    <Library.Example title="Constrained Table">
      <p>
        <code>Tables</code> render inside of a <code>Scrollbox</code> container
        component, which gives the table a scroll context and allows it to
        scroll if it overflows. Apply height/width constraints to an appropriate
        parent elements to enable this. Height will not change when loading.
      </p>
      <p>
        In this example, the last item in the table is pre-selected. Also in
        this example: an additional style is added to the first <code>td</code>{' '}
        in each row to make its foreground color different (NB: the example here
        would not meet ARIA contrast requirements). This demonstrates style
        extension/override.
      </p>
      <Library.Demo withSource>
        <div className="p-5">
          <LabeledButton onClick={() => setIsLoading(!isLoading)}>
            Toggle Loading
          </LabeledButton>
        </div>
        <div
          className="flex flex-col p-3"
          style="max-height:300px;height:300px;"
        >
          <Table
            accessibleLabel="File list"
            isLoading={isLoading}
            items={isLoading ? [] : items}
            selectedItem={selectedFile}
            onSelectItem={file => setSelectedFile(file)}
            onUseItem={file => alert(`Selected ${file.displayName}`)}
            renderItem={file => customizedRenderCallback(file)}
            tableHeaders={tableHeaders}
          />
        </div>
      </Library.Demo>
    </Library.Example>
  );
}

function EmptyTableExample() {
  const [isLoading, setIsLoading] = useState(false);
  const items = [];
  const [selectedFile, setSelectedFile] = useState(
    /** @type {null|object} */ (items[items.length - 1])
  );

  const emptyItemsMessage = (
    <p>
      There are no files available to show.{' '}
      <a href="https://www.example.com">Learn more.</a>
    </p>
  );

  return (
    <Library.Example title="Constrained Table">
      <p>
        This Table has no items (it is empty). When not in loading state, the
        provided <code>emptyItemsMessage</code> will render centered in the
        table.
      </p>
      <Library.Demo withSource>
        <div className="p-5">
          <LabeledButton onClick={() => setIsLoading(!isLoading)}>
            Toggle Loading
          </LabeledButton>
        </div>

        <Table
          accessibleLabel="File list"
          emptyItemsMessage={emptyItemsMessage}
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

export default function TableComponents() {
  return (
    <Library.Page title="Table">
      <Library.Pattern title="Table">
        <TableExample />
        <ScrollboxTableExample />
        <EmptyTableExample />
      </Library.Pattern>
    </Library.Page>
  );
}
