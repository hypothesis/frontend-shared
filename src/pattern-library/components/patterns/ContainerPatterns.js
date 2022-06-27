import { useState } from 'preact/hooks';

import { IconButton, LabeledButton } from '../../../';
import Library from '../Library';

import { SampleListElements } from './samples';

export default function ContainerPatterns() {
  const [showModalExample, setShowModalExample] = useState(false);
  return (
    <Library.Page title="Containers">
      <Library.Pattern title="Frame">
        <Library.Example title="Basic frame">
          <p>
            A <code>frame</code> provides a border, background, padding and
            vertical spacing of immediate children.
          </p>
          <Library.Demo withSource>
            <div className="hyp-frame">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Using frames with the 'clean' theme">
          <p>Clean-theme styling removes borders from frames.</p>
          <Library.Demo withSource>
            <div className="theme-clean">
              <div className="hyp-frame">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </div>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Card">
        <Library.Example title="Basic card">
          <p>
            A <code>card</code> is a frame with a shadow and hover-shadow effect
            that fills available horizontal space. It extends <code>frame</code>
            .
          </p>
          <Library.Demo withSource>
            <div className="hyp-card">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Card with no hover">
          <p>A card&apos;s hover can be disabled by using a modifying class.</p>
          <Library.Demo withSource>
            <div className="hyp-card--no-hover">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Card example with actions">
          <p>This example shows a card with some available actions.</p>
          <Library.Demo withSource>
            <div className="hyp-card">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="hyp-actions">
                <IconButton title="User" icon="profile" />
                <IconButton title="Edit" icon="edit" />
                <IconButton title="Delete" icon="trash" />
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Using cards with the 'clean' theme">
          <p>Clean-theme styling removes hover shadows and borders.</p>
          <Library.Demo withSource>
            <div className="theme-clean">
              <div className="hyp-card">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="hyp-actions">
                  <IconButton title="User" icon="profile" />
                  <IconButton title="Edit" icon="edit" />
                  <IconButton title="Delete" icon="trash" />
                </div>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Actions">
        <p>
          The <code>actions</code> pattern lays out a set of items, typically
          buttons, in a row (default) or column, with spacing.{' '}
        </p>
        <Library.Example title="Horizontal (default) layout">
          <p>
            These examples show <code>Actions</code> used in its default layout
            (horizontal) with <code>LabeledButton</code> and{' '}
            <code>IconButton</code> components.
          </p>
          <Library.Demo withSource>
            <div className="hyp-actions">
              <LabeledButton icon="profile">User</LabeledButton>
              <LabeledButton icon="edit">Edit</LabeledButton>
              <LabeledButton icon="trash">Delete</LabeledButton>
            </div>
          </Library.Demo>

          <Library.Demo withSource>
            <div className="hyp-actions">
              <IconButton title="User" icon="profile" />
              <IconButton title="Edit" icon="edit" />
              <IconButton title="Delete" icon="trash" />
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Columnar layout">
          <Library.Demo withSource>
            <div className="hyp-actions--column">
              <LabeledButton>User</LabeledButton>
              <LabeledButton>Edit</LabeledButton>
              <LabeledButton>Delete</LabeledButton>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Columnar layout, filling space">
          <p>
            This example shows buttons stretching to fill available space in{' '}
            <code>actions</code>.
          </p>
          <Library.Demo withSource>
            <div style="width:300px">
              <div className="hyp-actions--column">
                <LabeledButton variant="primary">Do this</LabeledButton>
                <LabeledButton variant="primary">No, this!</LabeledButton>
                <LabeledButton variant="primary">Maybe this?</LabeledButton>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Modal">
        <Library.Example title="Responsive modal container">
          <p>
            This pattern makes use of the <code>overlay</code> pattern. It
            responsively positions and sizes a container in the viewport to hold
            modal content.
          </p>
          <Library.Demo withSource>
            <div>
              <LabeledButton
                variant="primary"
                onClick={() => setShowModalExample(true)}
              >
                Show example
              </LabeledButton>
              <div
                className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-5"
                style={{ visibility: showModalExample ? 'visible' : 'hidden' }}
              >
                <div className="hyp-modal">
                  <div className="hyp-card">
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut congue bibendum ipsum, ut euismod eros. Morbi sit
                        amet sollicitudin diam. Cras tristique dui at nulla
                        gravida, non sodales velit tincidunt. Pellentesque
                        pharetra elit ac risus porta, vel vestibulum odio
                        consectetur. Aliquam convallis augue ex, vitae aliquet
                        enim varius id. Integer porttitor erat non nisi posuere,
                        a tempus felis ultrices. In hac habitasse platea
                        dictumst. Donec ut justo at odio pharetra laoreet ac
                        consectetur elit.
                      </p>
                    </div>
                    <div className="hyp-actions">
                      <LabeledButton
                        variant="primary"
                        onClick={() => setShowModalExample(false)}
                      >
                        Hide example
                      </LabeledButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Scrollbox">
        <p>
          <code>Scrollbox</code> is a CSS-only pattern that provides scroll-hint
          affordances for overflowing content (shadows). It sets its own{' '}
          <code>overflow: auto</code> scrolling context, but authors need to
          define bounding dimensions.
        </p>
        <Library.Example title="List in a scrollbox">
          <p>
            This example shows an overflowing <code>ul</code> in a{' '}
            <code>scrollbox</code>.
          </p>
          <Library.Demo withSource>
            <div style="height:250px;width:250px">
              <div className="hyp-scrollbox">
                <ul className="p-3 space-y-4">
                  <SampleListElements />
                </ul>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Scrollbox with header offset">
          <p>
            The <code>scrollbox--with-header</code> pattern offsets the top
            scroll-hinting shadow to accommodate one header-like element with a
            touch-target height (currently 44px).
          </p>

          <Library.Demo withSource>
            <div style="height:250px;width:250px">
              <div className="hyp-scrollbox--with-header">
                <div className="hyp-sticky-header">
                  <div className="hyp-sticky-header__heading">
                    <strong>NATO Phonetic Alphabet</strong>
                  </div>
                </div>
                <ul className="p-3 space-y-4">
                  <SampleListElements />
                </ul>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
