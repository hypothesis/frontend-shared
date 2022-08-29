import { useState } from 'preact/hooks';

import {
  DataTable,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Scroll,
} from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { nabokovNovels } from '../samples';

const nabokovRows = nabokovNovels();
const nabokovColumns = [
  { field: 'title', label: 'Title' },
  { field: 'year', label: 'Year' },
  { field: 'language', label: 'Language' },
];

export default function DataTablePage() {
  const [selectedRow, setSelectedRow] = useState(
    /** @type {import('../../../../components/data/DataTable').Row|null} */ (
      nabokovRows[nabokovRows.length - 1]
    )
  );

  const [selectedCRow, setSelectedCRow] = useState(
    /** @type {import('../../../../components/data/DataTable').Row|null} */ (
      null
    )
  );
  const [confirmedCRow, setConfirmedCRow] = useState(
    /** @type {import('../../../../components/data/DataTable').Row|null} */ (
      null
    )
  );
  return (
    <Library.Page
      title="DataTable"
      intro={
        <p>
          <code>DataTable</code> is a composite component that provides support
          for interactive tables, while <code>Table</code> and its allies are
          underlying presentational components for rendering table content.
        </p>
      }
    >
      <Library.Section
        title="DataTable"
        intro={
          <p>
            <code>DataTable</code> is a composite component that provides
            styling and behavioral support for interactive tables.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>DataTable</code> is a new component loosely based upon the
            legacy <code>Table</code> component.
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
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="rows">
            <p>
              <code>rows</code> is an Array of basic objects mapping field names
              to values.
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
              <code>th</code> elements and is mainly intended for setting width
              of columns.
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
              <code>row</code> and the <code>field</code> to format. Returning{' '}
              <code>null</code> will apply default formatting for the given{' '}
              <code>field</code> value.
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
      return null;
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
                          return null;
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

          <Library.Example title="selectedRow">
            <p>
              Optionally identify which row in the <code>rows</code> Array is
              currently selected.
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
              <code>onSelectRow</code> callback is invoked.
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
              callback is invoked.
            </p>
            <Library.Demo withSource>
              <div className="space-y-2 w-full">
                <div>
                  Selected row:{' '}
                  {selectedCRow ? <i>{selectedCRow.title}</i> : 'None'}
                </div>
                <div>
                  Confirmed row:{' '}
                  {confirmedCRow ? <i>{confirmedCRow.title}</i> : 'None'}
                </div>
                <div className="w-full h-[250px]">
                  <Scroll>
                    <DataTable
                      title="Some of Nabokov's novels"
                      rows={nabokovRows}
                      columns={nabokovColumns}
                      selectedRow={selectedCRow}
                      onSelectRow={row => setSelectedCRow(row)}
                      onConfirmRow={row => setConfirmedCRow(row)}
                    />
                  </Scroll>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
      <Library.Section
        title="Table"
        intro={
          <p>
            <code>Table</code> and its allies are presentational components for
            styling tabular data.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>Table</code> and its allies are new components.
          </p>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage
            componentName="Table, TableHead, TableBody, TableRow, TableCell"
            size="sm"
          />
          <Library.Example title="Simple Table">
            <Library.Demo withSource>
              <Table title="Some cities and their countries">
                <TableHead>
                  <TableRow>
                    <TableCell>City Name</TableCell>
                    <TableCell>Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Amsterdam</TableCell>
                    <TableCell>The Netherlands</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bergen</TableCell>
                    <TableCell>Norway</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Edinburgh</TableCell>
                    <TableCell>Scotland</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="stickyHeader">
            <p>
              Set this boolean prop to make the table headings sticky when in a
              scrolling context.
            </p>
            <Library.Demo title="Table with stickyHeader and Scroll" withSource>
              <div className="w-[450px] h-[250px]">
                <Scroll>
                  <Table title="Some cities and their countries" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>City Name</TableCell>
                        <TableCell>Country</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Amsterdam</TableCell>
                        <TableCell>The Netherlands</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bergen</TableCell>
                        <TableCell>Norway</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Edinburgh</TableCell>
                        <TableCell>Scotland</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cork</TableCell>
                        <TableCell>Ireland</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Shannon</TableCell>
                        <TableCell>Ireland</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Boston</TableCell>
                        <TableCell>USA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Denver</TableCell>
                        <TableCell>USA</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
