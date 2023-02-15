import { useState } from 'preact/hooks';

import { DataTable, Scroll } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { nabokovNovels } from '../samples';
import type { NabokovNovel } from '../samples';

const nabokovRows = nabokovNovels();
const nabokovColumns = [
  { field: 'title', label: 'Title' },
  { field: 'year', label: 'Year' },
  { field: 'language', label: 'Language' },
];

export default function DataTablePage() {
  const [selectedRow, setSelectedRow] = useState<NabokovNovel | null>(
    nabokovRows[nabokovRows.length - 1]
  );

  const [selectedRow2, setSelectedRow2] = useState<NabokovNovel | null>(null);
  const [confirmedRow, setConfirmedRow] = useState<NabokovNovel | null>(null);
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
      <Library.Section title="DataTable">
        <Library.Pattern title="Status">
          <p>
            <code>DataTable</code> is a new composite component loosely based
            upon the legacy <code>Table</code> component.
          </p>
          <Library.Example title="Migrating to this component">
            <p>
              Because API changes to this component are so extensive, it should
              be considered a new component.
            </p>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage componentName="DataTable" />

          <Library.Example title="Basic DataTable">
            <p>
              This example shows a non-interactive <code>DataTable</code> with{' '}
              <code>columns</code> and <code>rows</code> data.
            </p>
            <Library.Demo
              title="DataTable showing some of Vladimir Nabokov's novels"
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
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with tables">
          <Library.Example title="Rows, columns and items">
            <p>
              <code>DataTable</code> operates on <code>rows</code> and{' '}
              <code>columns</code>, which are described in detail in their
              respective Props sections. An <code>item</code> is a single field
              within a row (an individual table cell).
            </p>
            <p>
              All of the <code>DataTable</code> examples on this page use the
              same <code>rows</code> data:
            </p>
            <div className="h-[300px]">
              <Next.Code
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

        <Library.Pattern title="Props">
          <Library.Example title="rows">
            <p>
              <code>rows</code> is an Array of objects mapping field names to
              values.
            </p>
            <p>
              Only fields that are present in the <code>columns</code> data will
              be rendered. In this example, the <code>translatedTitle</code>{' '}
              field is not referenced in <code>columns</code>, so it is not
              rendered. In other words, row objects may contain entries that are
              not used by <code>DataTable</code>.
            </p>
            <Next.Code
              title="columns data used for this example"
              content={`const columns = [
  { field: 'title', label: 'Title' },
  { field: 'year', label: 'Year' },
  { field: 'language', label: 'Language' },
];`}
            />
            <Library.Demo withSource>
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
          </Library.Example>

          <Library.Example title="columns">
            <p>
              Columns define the headers that are rendered, as well as which row
              fields are rendered.
            </p>
            <p>
              <code>field</code> and <code>label</code> are required. Optional{' '}
              <code>classes</code> will extend CSS classes applied to associated{' '}
              <code>th</code> elements and is mainly intended for setting the
              width of columns.
            </p>
            <Next.Code
              title="columns data used for this example"
              content={`const columns = [
  { field: 'title', label: 'Title', classes: 'w-[80%]' },
  { field: 'year', label: 'Year' },
];`}
            />
            <Library.Demo withSource>
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
          </Library.Example>

          <Library.Example title="renderItem">
            <p>
              <code>renderItem</code> is a callback for formatting the contents
              of an individual table cell. It is given the current{' '}
              <code>row</code> and the <code>field</code> to format.
            </p>
            <Next.Code
              title="columns data used for this example"
              content={`const columns = [
  { field: 'title', label: 'Title' },
  { field: 'translatedTitle', label: 'Translated As' },
  { field: 'year', label: 'Year' },
];`}
            />
            <Next.Code
              title="`renderItem` callback used for this example"
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

            <Library.Demo withSource>
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
          </Library.Example>

          <Library.Example title="loading">
            <p>
              Set this boolean prop to show a loading spinner, while still
              displaying column headings.
            </p>
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

          <Library.Example title="emptyMessage">
            <p>
              An optional <code>emptyMessage</code> can be shown when the{' '}
              <code>rows</code> Array is empty and <code>loading</code> is not
              set.
            </p>
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
        </Library.Pattern>

        <Library.Pattern title="Props for interactive DataTables">
          <p>
            Several of the props available on <code>DataTable</code> support
            interactivity. Rows of data in interactive tables can be either{' '}
            <em>selected</em> or <em>confirmed</em>.
          </p>
          <p>
            A row can first be <strong>selected</strong> by a single click or
            keyboard navigation focus, then subsequently — if the use case calls
            for it — <strong>confirmed</strong> with a double-click or by
            pressing {"'Enter'"}. Confirmation can be a handy convenience
            affordance for, e.g., submitting a form, but selection alone may
            satisfy most use cases in which a user is prompted to choose an
            entry from a set of data rows.
          </p>
          <p>
            <code>DataTable</code> does not maintain internal state and expects
            a parent component to provide the current <code>selectedRow</code>.
            Provided <code>onSelectRow</code> and <code>onConfirmRow</code>{' '}
            callbacks are invoked when relevant mouse, keyboard and focus events
            occur.
          </p>

          <Library.Example title="selectedRow">
            <p>
              Identify which row in the <code>rows</code> Array is currently
              selected.
            </p>
            <Library.Demo withSource>
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

          <Library.Example title="onSelectRow">
            <p>
              When a table row is keyboard-focused or clicked on, the{' '}
              <code>onSelectRow</code> callback is invoked with the selected{' '}
              <code>row</code>.
            </p>
            <Library.Demo withSource>
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

          <Library.Example title="onConfirmRow">
            <p>
              When a table row is double-clicked, or <code>Enter</code> is
              pressed with the row in focus, the <code>onConfirmRow</code>{' '}
              callback is invoked with the confirmed <code>row</code>.
            </p>
            <Library.Demo withSource>
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
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
