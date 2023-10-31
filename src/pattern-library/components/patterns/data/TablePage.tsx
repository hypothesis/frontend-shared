import {
  ScrollContainer,
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../../';
import Library from '../../Library';

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
        <Library.Pattern>
          <Library.Usage
            componentName="Table, TableHead, TableBody, TableRow, TableCell"
            size="sm"
          />
          <Library.Demo title="Basic Table" withSource>
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
                    A roll consisting of avocado, kani kama (imitation crab/crab
                    stick) (also can contain real crab in {'premium'}{' '}
                    varieties), cucumber, and tobiko, often made as uramaki
                    (with rice on the outside, nori on the inside).
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Working with Tables">
          <Library.Example title="Composing Table components">
            <p>
              All <code>Table*</code> (<code>TableHead</code>,{' '}
              <code>TableFoot</code>, <code>TableRow</code>,{' '}
              <code>TableCell</code>, <code>TableBody</code>) are presentational
              components and take all standard props from the presentational
              component API. All also accept HTML attributes for their
              associated element.
            </p>
          </Library.Example>

          <Library.Example title="Sizing Tables">
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

        <Library.Pattern title="Component API">
          <code>Table</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="stickyHeader">
            <Library.Info>
              <Library.InfoItem label="description">
                Make the table headers sticky in scrolling contexts
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Table with stickyHeader and rounded Scroll"
              withSource
            >
              <div className="h-[250px]">
                <ScrollContainer rounded>
                  <Scroll>
                    <Table title="Some sushi rolls" stickyHeader borderless>
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
                            A variant of the California roll with smoked salmon
                            on the inside, or layered on the outside.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Boston roll</TableCell>
                          <TableCell>
                            An uramaki California roll with poached shrimp
                            instead of imitation crab.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>British Columbia roll</TableCell>
                          <TableCell>
                            A roll containing grilled or barbecued salmon skin,
                            cucumber, sweet sauce, sometimes with roe. Also
                            sometimes referred to as salmon skin rolls outside
                            of British Columbia, Canada.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>California roll</TableCell>
                          <TableCell>
                            A roll consisting of avocado, kani kama (imitation
                            crab/crab stick) (also can contain real crab in{' '}
                            {'premium'} varieties), cucumber, and tobiko, often
                            made as uramaki (with rice on the outside, nori on
                            the inside).
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
                            A roll containing shōyu tuna (canned), tamago,
                            kanpyō, kamaboko, and the distinctive red and green
                            hana ebi (shrimp powder).
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Scroll>
                </ScrollContainer>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="interactive">
            <Library.Info>
              <Library.InfoItem label="description">
                Set this boolean prop if rows in the table are select-able or
                otherwise interactive.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Table with interactive set" withSource>
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
          <Library.Example title="borderless">
            <Library.Info>
              <Library.InfoItem label="description">
                Set this boolean prop if you want to remove the table{"'"}s
                outer borders, in case it is rendered in a container with its
                own borders.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Table without borders" withSource>
              <Table title="Some sushi rolls" borderless>
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
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Link</code> accepts HTML attribute props applicable to{' '}
                <code>HTMLTableElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'preact.JSX.HTMLAttributes<HTMLTableElement>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
