import { useCallback, useRef, useState } from 'preact/hooks';

import { Button, DataTable, Scroll } from '../../../../';
import type { DataTableProps, Order } from '../../../../';
import { useOrderedRows } from '../../../../hooks/use-ordered-rows';
import Library from '../../Library';
import { nabokovNovels } from '../samples';
import type { NabokovNovel } from '../samples';

const nabokovRows = nabokovNovels();
const nabokovColumns = [
  { field: 'title' as const, label: 'Title' },
  { field: 'year' as const, label: 'Year' },
  { field: 'language' as const, label: 'Language' },
];

type SimpleNabokovNovel = Omit<NabokovNovel, 'translatedTitle'>;

function ClientOrderableDataTable({
  rows,
  // By default, all columns are orderable
  orderableColumns = nabokovColumns.map(({ field }) => field),
  ...rest
}: Omit<DataTableProps<SimpleNabokovNovel>, 'order' | 'onOrderChange'>) {
  const [order, setOrder] = useState<Order<keyof SimpleNabokovNovel>>();
  const orderedRows = useOrderedRows(rows, order);

  return (
    <>
      <Button classes="mb-2" onClick={() => setOrder(undefined)}>
        Reset order
      </Button>
      <div className="h-[250px]">
        <Scroll>
          <DataTable
            {...rest}
            rows={orderedRows}
            order={order}
            orderableColumns={orderableColumns}
            onOrderChange={setOrder}
          />
        </Scroll>
      </div>
    </>
  );
}

function AsyncOrderableDataTable({
  rows,
  // By default, all columns are orderable
  orderableColumns = nabokovColumns.map(({ field }) => field),
  ...rest
}: Omit<DataTableProps<SimpleNabokovNovel>, 'order' | 'onOrderChange'>) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order<keyof SimpleNabokovNovel>>();
  const activeTimeout = useRef<number | null>(null);

  const changeOrder = useCallback(
    (newOrder?: Order<keyof SimpleNabokovNovel>) => {
      if (activeTimeout.current) {
        // Abort current ordering, if any
        clearTimeout(activeTimeout.current);
      }

      setOrder(newOrder);
      setLoading(true);

      activeTimeout.current = setTimeout(() => {
        setLoading(false);
        activeTimeout.current = null;
      }, 600);
    },
    [],
  );
  const orderedRows = useOrderedRows(rows, order);

  return (
    <>
      <Button classes="mb-2" onClick={() => changeOrder(undefined)}>
        Reset order
      </Button>
      <div className="h-[250px]">
        <Scroll>
          <DataTable
            {...rest}
            rows={orderedRows}
            order={order}
            orderableColumns={orderableColumns}
            onOrderChange={changeOrder}
            loading={loading}
          />
        </Scroll>
      </div>
    </>
  );
}

export default function DataTablePage() {
  // For examples that support single selection
  const [selectedRow, setSelectedRow] = useState<NabokovNovel | null>(
    nabokovRows[nabokovRows.length - 1],
  );
  const [selectedRow2, setSelectedRow2] = useState<NabokovNovel | null>(null);
  const [confirmedRow, setConfirmedRow] = useState<NabokovNovel | null>(null);

  // For examples that support multi-selection
  const [selectedRows, setSelectedRows] = useState<NabokovNovel[]>([]);

  return (
    <Library.Page
      title="DataTable"
      intro={
        <p>
          <code>DataTable</code> is a composite component that provides support
          for interactive tables with columns and rows data. It is built atop
          the <code>Table</code> family of presentational components.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="DataTable" />

          <Library.Demo title="Basic DataTable" withSource>
            <div className="w-full h-[250px]">
              <Scroll>
                <DataTable
                  title="A subset of Nabokov's novels with publish date and original language"
                  rows={nabokovRows}
                  columns={nabokovColumns}
                />
              </Scroll>
            </div>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Working with tables">
          <Library.Example title="Rows, columns and items">
            <p>
              <code>DataTable</code> operates on <code>rows</code> and
              <code>columns</code>. Rows are generic key-value objects and
              columns determine which fields in each row are rendered in the
              table.
            </p>
            <p>
              All of the <code>DataTable</code> examples on this page use the
              same <code>rows</code> data:
            </p>
            <div className="h-[300px]">
              <Library.Code
                title="rows data used for examples on this page"
                content={`const rows = [
    {
      title: 'Машенька',
      year: '1926',
      language: 'Russian',
      translatedTitle: 'Mary',
    },
    {
      title: 'Король, дама, валет',
      year: '1928',
      language: 'Russian',
      translatedTitle: 'King, Queen, Knave',
    },
    {
      title: 'Защита Лужина',
      year: '1930',
      language: 'Russian',
      translatedTitle: 'The Defense',
    },
    {
      title: 'Соглядатай',
      year: '1930',
      language: 'Russian',
      translatedTitle: 'The Eye',
    },
    {
      title: 'The Real Life of Sebastian Knight',
      year: '1941',
      language: 'English',
    },
    {
      title: 'Bend Sinister',
      year: '1947',
      language: 'English',
    },
    {
      title: 'Pale Fire',
      year: '1965',
      language: 'English',
    },
    {
      title: 'Подвиг',
      year: '1932',
      language: 'Russian',
      translatedTitle: 'Glory',
    },
    {
      title: 'Ada or Ardor: A Family Chronicle',
      year: '1969',
      language: 'English',
    },
  ];`}
              />
            </div>
            <Library.Code
              title="example of columns"
              content={`const columns = [
  { field: 'title', label: 'Title', classes: 'w-[80%]' },
  { field: 'year', label: 'Year' },
];`}
            />
          </Library.Example>
          <Library.Example title="Interactive DataTables">
            <p>
              The presence of a <code>onSelectRow</code>,{' '}
              <code>onSelectRows</code> or <code>onConfirmRow</code> callback
              prop will cause a <code>DataTable</code> to be interactive.
            </p>
            <p>
              Rows in interactive <code>DataTable</code>s can be{' '}
              <strong>selected</strong> by a single click or keyboard navigation
              focus, then subsequently — if <code>onConfirmRow</code> is
              provided — <strong>confirmed</strong> with a double-click or by
              pressing {"'Enter'"}.
            </p>
            <p>
              <code>DataTable</code> does not maintain internal state and
              expects a parent component to provide the current selected rows.
              If the user should be able to select a single row, this should be
              passed via <code>selectedRow</code>. If the user should be allowed
              to selected multiple rows, the selection should be passed via{' '}
              <code>selectedRows</code>.
            </p>

            <Library.Demo
              title="Interactive DataTable with callbacks for row selection, confirmation"
              withSource
            >
              <div className="space-y-2 w-full">
                <div>
                  Selected row:{' '}
                  {selectedRow2 ? <i>{selectedRow2.title}</i> : 'None'}
                </div>
                <div>
                  Confirmed row:{' '}
                  {confirmedRow ? <i>{confirmedRow.title}</i> : 'None'}
                </div>
                <div className="w-full h-[250px]">
                  <Scroll>
                    <DataTable
                      title="Some of Nabokov's novels"
                      rows={nabokovRows}
                      columns={nabokovColumns}
                      selectedRow={selectedRow2}
                      onSelectRow={row => setSelectedRow2(row)}
                      onConfirmRow={row => setConfirmedRow(row)}
                    />
                  </Scroll>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Tables in constrained spaces">
            <p>
              <code>DataTable</code> and <code>Table</code> are designed to be
              compatible with scrolling contexts. The examples on this page are
              constrained within <code>Scroll</code> components.
            </p>
            <p>
              <code>DataTable</code> is designed to fill its containing space
              vertically. If there are sparse data (fewer rows than fill the
              space), the <code>Table</code> will still occupy the full vertical
              height.
            </p>

            <Library.Demo
              withSource
              title="Constrained Table with sparse content"
            >
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="A subset of Nabokov's novels with publish date and original language"
                    rows={[nabokovRows[0], nabokovRows[1]]}
                    columns={nabokovColumns}
                  />
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>DataTable</code> accepts all standard{' '}
            <Library.Link href="/using-components#composite-components-api">
              composite component props
            </Library.Link>
            .
          </p>
          <p>
            <code>rows</code>, <code>columns</code> and <code>title</code> are
            required.
          </p>
          <Library.Example title="columns">
            <Library.Info>
              <Library.InfoItem label="description">
                An array of objects defining headers to render, as well as which
                fields in <code>rows</code> are rendered. Optional{' '}
                <code>classes</code> extend CSS classes applied to associated{' '}
                <code>th</code> elements.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <Library.Code
                  size="sm"
                  content={`Array<{
  field: string;
  label: string;
  classes?: string;
}>
`}
                />
              </Library.InfoItem>
              <Library.InfoItem label="required">
                <code>true</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Setting columns for a DataTable" withSource>
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="Some of Nabokov's novels and their publish date"
                    rows={nabokovRows}
                    columns={[
                      { field: 'title', label: 'Title', classes: 'w-[80%]' },
                      { field: 'year', label: 'Year' },
                    ]}
                  />
                </Scroll>
              </div>
            </Library.Demo>
            <Library.Code
              title="columns data used for this example"
              content={`const columns = [
  { field: 'title', label: 'Title', classes: 'w-[80%]' },
  { field: 'year', label: 'Year' },
];`}
            />
          </Library.Example>

          <Library.Example title="rows">
            <Library.Info>
              <Library.InfoItem label="description">
                Array of objects mapping field names to values. Only fields that
                are declared in <code>columns</code> will be rendered.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Array<Record<string,any>`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="required">
                <code>true</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo
              title="Only fields declared in columns are rendered"
              withSource
            >
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="A subset of Nabokov's novels with publish date and original language"
                    rows={nabokovRows}
                    columns={nabokovColumns}
                  />
                </Scroll>
              </div>
            </Library.Demo>

            <p>
              In this example, the <code>translatedTitle</code> field is not
              referenced in <code>columns</code>, so it is not rendered.
            </p>
            <Library.Code
              title="columns data used for this example"
              content={`const columns = [
  { field: 'title', label: 'Title' },
  { field: 'year', label: 'Year' },
  { field: 'language', label: 'Language' },
];`}
            />
          </Library.Example>

          <Library.Example title="emptyMessage">
            <Library.Info>
              <Library.InfoItem label="description">
                Message to show if there are no <code>rows</code>. Superseded by{' '}
                <code>loading</code> state.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`preact.ComponentChildren`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo withSource>
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="Some of Nabokov's novels"
                    rows={[]}
                    columns={nabokovColumns}
                    emptyMessage={<strong>No books found</strong>}
                  />
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="loading">
            <Library.Info>
              <Library.InfoItem label="description">
                Show a loading spinner. Column headings are still displayed.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo withSource>
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="Some of Nabokov's novels"
                    rows={nabokovRows}
                    columns={nabokovColumns}
                    loading={true}
                  />
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="renderItem">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback for formatting the contents of an individual table
                cell.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(r: Row, field: keyof Row) => preact.ComponentChildren`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`(r: Row, field: keyof Row) => r[field] as ComponentChildren`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo
              title="Using renderItem to format table cell contents"
              withSource
            >
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="Some of Nabokov's novels and their translated titles"
                    rows={nabokovRows}
                    columns={[
                      { field: 'title', label: 'Title' },
                      { field: 'translatedTitle', label: 'Translated As' },
                      { field: 'year', label: 'Year' },
                    ]}
                    renderItem={(row, field) => {
                      switch (field) {
                        case 'title':
                          return <i>{row.title}</i>;
                        case 'translatedTitle':
                          return row.translatedTitle ? (
                            <i>{row.translatedTitle}</i>
                          ) : (
                            'N/A'
                          );
                        default:
                          return row[field];
                      }
                    }}
                  />
                </Scroll>
              </div>
            </Library.Demo>
            <Library.Code
              title="renderItem callback used for this example"
              size="sm"
              content={`const renderItem = (row, field) => {
  switch (field) {
    case 'title':
      return <i>{row.title}</i>;
    case 'translatedTitle':
      return row.translatedTitle ? (
        <i>{row.translatedTitle}</i>
      ) : (
        'N/A'
      );
    default:
      return row[field];
  }
}`}
            />
          </Library.Example>

          <Library.Example title="onSelectRow">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked when a row is selected (focused or
                single-clicked).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(r: Row) => void`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="DataTable with onSelectRow callback"
              withSource
            >
              <div className="space-y-2 w-full">
                <div>
                  Selected row:{' '}
                  {selectedRow ? <i>{selectedRow.title}</i> : 'None'}
                </div>
                <div className="w-full h-[250px]">
                  <Scroll>
                    <DataTable
                      title="Some of Nabokov's novels"
                      rows={nabokovRows}
                      columns={nabokovColumns}
                      selectedRow={selectedRow}
                      onSelectRow={row => setSelectedRow(row)}
                    />
                  </Scroll>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="onSelectRows">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked when the selected rows are changed if multi-row
                selections are enabled by passing the `selectedRows` prop.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(r: Row[]) => void`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="DataTable with onSelectRows callback"
              withSource
            >
              <div className="space-y-2 w-full">
                <div>
                  Selected rows:{' '}
                  {selectedRows.length > 0 ? (
                    <i>{selectedRows.map(r => r.title).join(', ')}</i>
                  ) : (
                    'None'
                  )}
                </div>
                <div className="w-full h-[250px]">
                  <Scroll>
                    <DataTable
                      title="Some of Nabokov's novels"
                      rows={nabokovRows}
                      columns={nabokovColumns}
                      selectedRows={selectedRows}
                      onSelectRows={rows => setSelectedRows(rows)}
                    />
                  </Scroll>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="onConfirmRow">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked when a row is confirmed (double-clicked, or{' '}
                <kbd>enter</kbd> pressed)
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(r: Row) => void`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="selectedRow">
            <Library.Info>
              <Library.InfoItem label="description">
                Set which Row in <code>rows</code> is currently selected.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Row`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="DataTable with selectedRow" withSource>
              <div className="w-full h-[250px]">
                <Scroll>
                  <DataTable
                    title="Some of Nabokov's novels"
                    rows={nabokovRows}
                    columns={nabokovColumns}
                    selectedRow={nabokovRows[2]}
                  />
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="selectedRows">
            <Library.Info>
              <Library.InfoItem label="description">
                This is like <code>selectedRow</code> except that it specifies
                an array of rows, and enables the user to select multiple rows.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Row[]`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="order">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the column from which <code>rows</code> are currently
                ordered. It will cause an arrow icon to be displayed next to the
                corresponding column name.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {`{ field: T; direction: 'ascending' | 'descending' } | null`}
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="onOrderChange">
            <Library.Info>
              <Library.InfoItem label="description">
                Used together with <code>order</code>, can be used to know what
                is the new order to apply when a column is clicked. It will
                cause columns to have a pointer cursor.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {`(newOrder: { field: T; direction: 'ascending' | 'descending' } | null) => void`}
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="DataTable with client-side ordering">
              <div className="w-full">
                <ClientOrderableDataTable
                  title="Some of Nabokov's novels"
                  rows={nabokovRows}
                  columns={nabokovColumns}
                />
              </div>
            </Library.Demo>

            <Library.Demo title="DataTable with server-side ordering">
              <div className="w-full">
                <AsyncOrderableDataTable
                  title="Some of Nabokov's novels"
                  rows={nabokovRows}
                  columns={nabokovColumns}
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="orderableColumns">
            <Library.Info>
              <Library.InfoItem label="description">
                If provided together with <code>onOrderChange</code>, it allows
                to restrict which columns can be used to order the table.
                Defaults to all columns.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Field[] | undefined`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Partially orderable DataTable">
              <div className="w-full">
                <ClientOrderableDataTable
                  title="Some of Nabokov's novels"
                  rows={nabokovRows}
                  columns={nabokovColumns}
                  orderableColumns={['title', 'year']}
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="borderless">
            <Library.Info>
              <Library.InfoItem label="description">
                See{' '}
                <Library.Link href="/data-table#table-props-borderless">
                  borderless Table
                </Library.Link>
                .
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>DataTable</code> accepts HTML element attributes except
                those detailed below.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'rows' | 'role' | 'loading'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
