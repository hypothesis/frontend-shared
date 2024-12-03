import {
  ScrollBox,
  Scroll,
  ScrollContainer,
  ScrollContent,
} from '../../../../';
import Library from '../../Library';
import { SampleListElements } from '../samples';

export default function ScrollBoxPage() {
  return (
    <Library.Page
      title="ScrollBox"
      intro={
        <p>
          The composite <code>ScrollBox</code> component provides a container
          for scrolling content, while individual <code>Scroll</code> components
          are available for additional customization if needed.
        </p>
      }
    >
      <Library.Section
        title="ScrollBox"
        intro={
          <p>
            <code>ScrollBox</code> is an opinionated composite component that
            provides a shorthand for styling scrollable content.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="ScrollBox" />
          <Library.Demo title="Basic Scrollbox" withSource>
            <div className="w-[280px] h-[200px]">
              <ScrollBox>
                <ul>
                  <SampleListElements />
                </ul>
              </ScrollBox>
            </div>
          </Library.Demo>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>ScrollBox</code> accepts all standard{' '}
            <Library.Link href="/using-components#composite-components-api">
              composite component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="borderless">
            <Library.Info>
              <Library.InfoItem label="description">
                Disable the border on the <code>ScrollBox</code>
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Turning off borders" withSource>
              <div className="w-[280px] h-[200px]">
                <ScrollBox borderless>
                  <ul>
                    <SampleListElements />
                  </ul>
                </ScrollBox>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section
        title="Working with scrolling components"
        intro={
          <p>
            <code>Scroll</code> and its allies allow for more customization
            control if <code>ScrollBox</code> {"doesn't"} meet flexibility
            needs.
          </p>
        }
      >
        <Library.SectionL2 title="Composing Scroll components">
          <Library.SectionL3>
            <p>
              Sizing constraints are dictated by the immediate parent container
              of the outermost <code>Scroll*</code> component. Here and in
              following examples, the parent container sets width (
              <code>320px</code>) and height (<code>200px</code>).
            </p>
            <Library.Demo
              title="Using Scroll components to manage scroll"
              withSource
            >
              <div className="w-[320px] h-[200px]">
                <ScrollContainer>
                  <Scroll>
                    <ScrollContent>
                      <ul>
                        <SampleListElements />
                      </ul>
                    </ScrollContent>
                  </Scroll>
                </ScrollContainer>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section
        title="Scroll"
        intro={
          <p>
            <code>Scroll</code> is a presentational component providing a fluid
            container that scrolls on overflow.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="Scroll" />
          <Library.SectionL3>
            <Library.Demo title="Basic Scroll" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll>
                  <ul>
                    <SampleListElements />
                  </ul>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>Scroll</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Scroll</code>
                {"'s"} default <code>{"'raised'"}</code> <code>variant</code>{' '}
                renders CSS shadows to hint that content is scrollable. These
                can be disabled by using the <code>flat</code> variant.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'raised' | 'flat'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{'raised'}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="variant:'flat'" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll variant="flat">
                  <ul>
                    <SampleListElements />
                  </ul>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Scroll</code> accepts HTML element attributes
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section
        title="ScrollContent"
        intro={
          <p>
            <code>ScrollContent</code> is a presentational component that puts
            consistent padding and spacing around content in a{' '}
            <code>Scroll</code> component.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="ScrollContent" />
          <Library.SectionL3>
            <Library.Demo title="Scroll with ScrollContent" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll>
                  <ScrollContent>
                    <ul>
                      <SampleListElements />
                    </ul>
                  </ScrollContent>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>ScrollContent</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Scroll</code> accepts HTML element attributes
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLDivElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section
        title="ScrollContainer"
        intro={
          <>
            <p>
              <code>ScrollContainer</code> is a presentational component that
              allows the combination of scrolling and non-scrolling content to
              be constrained to the parent {"container's"} dimensions. This is
              very handy when trying to constrain complex content within, e.g.,
              a modal.
            </p>
            <p>
              Only the content within <code>Scroll</code> actually scrolls.
            </p>
          </>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="ScrollContainer" />

          <Library.Demo title="Basic ScrollContainer" withSource>
            <div className="w-[320px] h-[200px]">
              <ScrollContainer>
                <div className="p-2 border-b">Non-scrolling content here</div>
                <Scroll>
                  <ScrollContent>
                    <ul>
                      <SampleListElements />
                    </ul>
                  </ScrollContent>
                </Scroll>
                <div className="p-2 border-t">More non-scrolling content</div>
              </ScrollContainer>
            </div>
          </Library.Demo>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>ScrollContainer</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="borderless">
            <Library.Info>
              <Library.InfoItem label="description">
                Disable the border on the <code>ScrollContainer</code>
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="w-[320px] h-[200px]">
                <ScrollContainer borderless>
                  <div className="p-2 border-b">Non-scrolling content here</div>
                  <Scroll>
                    <ScrollContent>
                      <ul>
                        <SampleListElements />
                      </ul>
                    </ScrollContent>
                  </Scroll>
                </ScrollContainer>
              </div>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>ScrollContainer</code> accepts HTML element attributes
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLDivElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
