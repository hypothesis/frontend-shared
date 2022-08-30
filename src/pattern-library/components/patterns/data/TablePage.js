import {
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../../next';

import Library from '../../Library';
import Next from '../../LibraryNext';

export default function TablePage() {
  return (
    <Library.Page
      title="Table"
      intro={
        <p>
          <code>Table</code>, <code>TableHead</code>, <code>TableBody</code>,{' '}
          <code>TableRow</code> and <code>TableCell</code> are presentational
          components for rendering table content.
        </p>
      }
    >
      <Library.Section title="Table">
        <Library.Pattern title="Status">
          <p>
            <code>Table</code>, <code>TableHead</code>, <code>TableBody</code>,{' '}
            <code>TableRow</code> and <code>TableCell</code> are new components.
          </p>
          <p>
            <code>Table</code> is a presentational component, and, as such, is
            not equivalent to the legacy <code>Table</code> component.
          </p>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage
            componentName="Table, TableHead, TableBody, TableRow, TableCell"
            size="sm"
          />
          <Library.Example title="Simple Table">
            <Library.Demo withSource>
              <Table title="Some sushi rolls">
                <TableHead>
                  <TableRow>
                    <TableCell>Sushi roll name</TableCell>
                    <TableCell>Definition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alaskan roll</TableCell>
                    <TableCell>
                      A variant of the California roll with smoked salmon on the
                      inside, or layered on the outside.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Boston roll</TableCell>
                    <TableCell>
                      An uramaki California roll with poached shrimp instead of
                      imitation crab.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>British Columbia roll</TableCell>
                    <TableCell>
                      A roll containing grilled or barbecued salmon skin,
                      cucumber, sweet sauce, sometimes with roe. Also sometimes
                      referred to as salmon skin rolls outside of British
                      Columbia, Canada.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>California roll</TableCell>
                    <TableCell>
                      A roll consisting of avocado, kani kama (imitation
                      crab/crab stick) (also can contain real crab in{' '}
                      {'premium'} varieties), cucumber, and tobiko, often made
                      as uramaki (with rice on the outside, nori on the inside).
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Library.Demo>

            <p>
              Table column width is established by the first row, which are
              typically headers.
            </p>

            <Library.Demo title="Controlling column width" withSource>
              <Table title="Some sushi rolls">
                <TableHead>
                  <TableRow>
                    <TableCell classes="w-[200px]">Sushi roll name</TableCell>
                    <TableCell>Definition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alaskan roll</TableCell>
                    <TableCell>
                      A variant of the California roll with smoked salmon on the
                      inside, or layered on the outside.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Boston roll</TableCell>
                    <TableCell>
                      An uramaki California roll with poached shrimp instead of
                      imitation crab.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>British Columbia roll</TableCell>
                    <TableCell>
                      A roll containing grilled or barbecued salmon skin,
                      cucumber, sweet sauce, sometimes with roe. Also sometimes
                      referred to as salmon skin rolls outside of British
                      Columbia, Canada.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>California roll</TableCell>
                    <TableCell>
                      A roll consisting of avocado, kani kama (imitation
                      crab/crab stick) (also can contain real crab in{' '}
                      {'premium'} varieties), cucumber, and tobiko, often made
                      as uramaki (with rice on the outside, nori on the inside).
                    </TableCell>
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
              <div className="h-[250px]">
                <Scroll>
                  <Table title="Some sushi rolls" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell classes="w-[180px]">
                          Sushi roll name
                        </TableCell>
                        <TableCell>Definition</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Alaskan roll</TableCell>
                        <TableCell>
                          A variant of the California roll with smoked salmon on
                          the inside, or layered on the outside.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Boston roll</TableCell>
                        <TableCell>
                          An uramaki California roll with poached shrimp instead
                          of imitation crab.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>British Columbia roll</TableCell>
                        <TableCell>
                          A roll containing grilled or barbecued salmon skin,
                          cucumber, sweet sauce, sometimes with roe. Also
                          sometimes referred to as salmon skin rolls outside of
                          British Columbia, Canada.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>California roll</TableCell>
                        <TableCell>
                          A roll consisting of avocado, kani kama (imitation
                          crab/crab stick) (also can contain real crab in{' '}
                          {'premium'} varieties), cucumber, and tobiko, often
                          made as uramaki (with rice on the outside, nori on the
                          inside).
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dynamite roll</TableCell>
                        <TableCell>
                          A roll including yellowtail (hamachi) or prawn
                          tempura, and fillings such as bean sprouts, carrots,
                          avocado, cucumber, chili, spicy mayonnaise, and roe.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hawaiian roll</TableCell>
                        <TableCell>
                          A roll containing shōyu tuna (canned), tamago, kanpyō,
                          kamaboko, and the distinctive red and green hana ebi
                          (shrimp powder).
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="interactive">
            <p>
              Set this boolean prop if rows in the table are select-able or
              otherwise interactive.
            </p>
            <Library.Demo withSource>
              <Table title="Some sushi rolls" interactive>
                <TableHead>
                  <TableRow>
                    <TableCell classes="w-[180px]">Sushi roll name</TableCell>
                    <TableCell>Definition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow onClick={() => alert('Yum, Alaska roll!')}>
                    <TableCell>Alaskan roll</TableCell>
                    <TableCell>
                      A variant of the California roll with smoked salmon on the
                      inside, or layered on the outside.
                    </TableCell>
                  </TableRow>
                  <TableRow onClick={() => alert('This is a new one!')}>
                    <TableCell>Boston roll</TableCell>
                    <TableCell>
                      An uramaki California roll with poached shrimp instead of
                      imitation crab.
                    </TableCell>
                  </TableRow>
                  <TableRow
                    onClick={() => alert('I call this a salmon-skin roll')}
                  >
                    <TableCell>British Columbia roll</TableCell>
                    <TableCell>
                      A roll containing grilled or barbecued salmon skin,
                      cucumber, sweet sauce, sometimes with roe. Also sometimes
                      referred to as salmon skin rolls outside of British
                      Columbia, Canada.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
