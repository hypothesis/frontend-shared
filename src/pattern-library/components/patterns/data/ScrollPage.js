import { Scroll, ScrollContainer, ScrollContent } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { SampleListElements } from '../samples';

export default function ScrollPage() {
  return (
    <Library.Page
      title="Scroll"
      intro={
        <>
          <p>
            The <code>Scroll</code> family of presentational components provide
            support for customized scrollable content in cases that{' '}
            <code>ScrollBox</code> does not satisfy a use case.
          </p>
          <ul>
            <li>
              <code>ScrollContainer</code>: Contains its content — a mix of
              scrollable and (optionally) non-scrollable content — to the
              dimensions of a parent element
            </li>
            <li>
              <code>Scroll</code>: A layout container that scrolls on overflow,
              with shadows for scroll-hinting
            </li>
            <li>
              <code>ScrollContent</code>: Applies consistent spacing and padding
              to content in a <code>Scroll</code>
            </li>
          </ul>
        </>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Scroll</code>, <code>ScrollContainer</code>, and{' '}
          <code>ScrollContent</code> are new components modeled after aspects of
          the legacy <code>Scrollbox</code> component.
        </p>
      </Library.Pattern>

      <Library.Pattern title="Usage">
        <Next.Usage
          componentName="Scroll, ScrollContainer, ScrollContent"
          size="sm"
        />
        <Library.Example>
          <p>
            Sizing constraints are dictated by the immediate parent container of
            the outermost <code>Scroll*</code> component. Here and in following
            examples, the parent container sets width (<code>320px</code>) and
            height (<code>200px</code>).
          </p>
          <Library.Demo title="Scrolling content" withSource>
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

      <Library.Pattern title="Scroll">
        <p>
          <code>Scroll</code> provides a fluid container that scrolls on
          overflow.
        </p>
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

        <Library.Example title="variant">
          <p>
            <code>Scroll</code>
            {"'s"} <code>raised</code> variant (default) renders CSS shadows to
            hint that content is scrollable. These can be disabled by using the{' '}
            <code>flat</code> variant.
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

      <Library.Pattern title="ScrollContent">
        <p>
          <code>ScrollContent</code> puts consistent padding and spacing around
          content in a <code>Scroll</code> component.
        </p>
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

      <Library.Pattern title="ScrollContainer">
        <p>
          <code>ScrollContainer</code> allows the combination of scrolling and
          non-scrolling content to be constrained to the parent {"container's"}{' '}
          dimensions. This is very handy when trying to constrain complex
          content within, e.g., a modal.
        </p>
        <p>
          Only the content within <code>Scroll</code> actually scrolls.
        </p>
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
    </Library.Page>
  );
}
