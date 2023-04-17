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
        <Library.Pattern title="Usage">
          <Library.Usage componentName="ScrollBox" />
          <Library.Example title="Basic ScrollBox">
            <Library.Demo withSource>
              <div className="w-[280px] h-[200px]">
                <ScrollBox>
                  <ul>
                    <SampleListElements />
                  </ul>
                </ScrollBox>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="borderless">
            <p>
              <code>ScrollBox</code> applies a border to the outer{' '}
              <code>ScrollContainer</code> by default. This can be disabled with
              the <code>borderless</code> boolean prop.
            </p>
            <Library.Demo title="Turning off borders" withSource>
              <div className="w-[280px] h-[200px]">
                <ScrollBox borderless>
                  <ul>
                    <SampleListElements />
                  </ul>
                </ScrollBox>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="Customizing scrolling"
        intro={
          <p>
            <code>Scroll</code> and its allies allow for more customization
            control if <code>ScrollBox</code> {"doesn't"} meet flexibility
            needs.
          </p>
        }
      >
        <Library.Pattern title="Working with Scroll components">
          <Library.Example>
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
          </Library.Example>
        </Library.Pattern>
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
        <Library.Pattern title="Usage">
          <Library.Usage componentName="Scroll" />
          <Library.Example>
            <Library.Demo title="Using Scroll by itself" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll>
                  <ul>
                    <SampleListElements />
                  </ul>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="variant">
            <p>
              <code>Scroll</code>
              {"'s"} <code>raised</code> variant (default) renders CSS shadows
              to hint that content is scrollable. These can be disabled by using
              the <code>flat</code> variant.
            </p>
            <Library.Demo title="variant:'raised' (default)" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll variant="raised">
                  <ul>
                    <SampleListElements />
                  </ul>
                </Scroll>
              </div>
            </Library.Demo>

            <Library.Demo title="variant:'flat'" withSource>
              <div className="w-[320px] h-[200px]">
                <Scroll variant="flat">
                  <ul>
                    <SampleListElements />
                  </ul>
                </Scroll>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
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
        <Library.Pattern title="Usage">
          <Library.Usage componentName="ScrollContent" />
          <Library.Example>
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
          </Library.Example>
        </Library.Pattern>
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
        <Library.Pattern title="Usage">
          <Library.Usage componentName="ScrollContainer" />

          <Library.Example>
            <Library.Demo title="Using ScrollContainer" withSource>
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
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="borderless">
            <p>
              Turn off <code>ScrollContainer</code> borders with the{' '}
              <code>borderless</code> boolean prop.
            </p>
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
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
