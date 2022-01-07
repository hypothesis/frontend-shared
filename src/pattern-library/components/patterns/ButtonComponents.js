import { IconButton, LabeledButton, LinkButton } from '../../../';
import Library from '../Library';

export default function ButtonComponents() {
  return (
    <Library.Page title="Buttons">
      <p>
        Button components support the following <strong>variants</strong>:
      </p>
      <ul className="hyp-list">
        <li>Default</li>
        <li>
          Primary: For indicating that a button represents a primary action
        </li>
        <li>Dark: For rendering a button on a grey background</li>
        <li>
          Light: This variant should only be used for non-critical buttons on
          white backgrounds (low contrast).
        </li>
      </ul>
      <p>
        In addition, a button may be in one of four states, which are
        represented in their variant examples, left to right:
      </p>
      <ul className="hyp-list">
        <li>Default</li>
        <li>Pressed</li>
        <li>Expanded</li>
        <li>Disabled</li>
      </ul>

      <Library.Pattern title="IconButton">
        <p>A button containing an icon and no other content.</p>
        <Library.Example title="Basic use and sizes">
          <p>
            The optional <code>size</code> property affects the proportions and
            overall size of the button by way of padding. It does not change the
            size of the icon itself, which is sized at&nbsp;
            <code>1em</code>. The default sizing is <code>medium</code>.
          </p>
          <Library.Demo withSource>
            <IconButton icon="edit" title="Edit" size="small" />
            <IconButton icon="edit" title="Edit" size="medium" />
            <IconButton icon="edit" title="Edit" size="large" />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Variants" variant="wide">
          <h4>Dark variant</h4>
          <p>
            The <code>IconButton</code> dark variant is for use on darker (light
            grey vs. white) backgrounds. Note that this button, unlike other{' '}
            <code>IconButton</code>s, has a background color. This is to allow
            for a use case in which the dark <code>IconButton</code> is
            initially fixed on a grey background but floats on top of content
            when scrolled.
          </p>
          <h4>Light variant</h4>
          <p>
            This variant should only be used for non-critical icons on white
            backgrounds (low contrast).
          </p>
          <Library.Demo title="Default" withSource>
            <IconButton icon="trash" title="Delete annotation" />
            <IconButton icon="trash" title="Delete annotation" pressed />
            <IconButton icon="trash" title="Delete annotation" expanded />
            <IconButton icon="trash" title="Delete annotation" disabled />
          </Library.Demo>

          <Library.Demo title="Primary" withSource>
            <IconButton
              icon="trash"
              title="Delete annotation"
              variant="primary"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              pressed
              variant="primary"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              expanded
              variant="primary"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              disabled
              variant="primary"
            />
          </Library.Demo>

          <Library.Demo title="Dark" withSource>
            <IconButton icon="trash" title="Delete annotation" variant="dark" />
            <IconButton
              icon="trash"
              title="Delete annotation"
              pressed
              variant="dark"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              expanded
              variant="dark"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              disabled
              variant="dark"
            />
          </Library.Demo>

          <Library.Demo title="Light" withSource>
            <IconButton
              icon="trash"
              title="Delete annotation"
              variant="light"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              pressed
              variant="light"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              expanded
              variant="light"
            />
            <IconButton
              icon="trash"
              title="Delete annotation"
              disabled
              variant="light"
            />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="LabeledButton">
        <p>A button with content and, optionally, an icon.</p>
        <Library.Example title="Basic use and sizes">
          <p>
            The optional <code>size</code> property affects the proportions and
            overall size of the button by way of padding. It does not change the
            size of the icon itself, which is sized at&nbsp;
            <code>1em</code>. The default sizing is <code>medium</code>.
          </p>
          <Library.Demo title="Label only" withSource>
            <LabeledButton size="small">Edit</LabeledButton>
            <LabeledButton>Edit</LabeledButton>
            <LabeledButton size="large">Edit</LabeledButton>
          </Library.Demo>

          <Library.Demo title="Label, icon" withSource>
            <LabeledButton icon="profile" size="small">
              Edit User
            </LabeledButton>
            <LabeledButton icon="profile">Edit User</LabeledButton>
            <LabeledButton icon="profile" size="large">
              Edit User
            </LabeledButton>
          </Library.Demo>

          <Library.Demo title="Label, icon on right" withSource>
            <LabeledButton icon="profile" size="small" iconPosition="right">
              Edit User
            </LabeledButton>
            <LabeledButton icon="profile" iconPosition="right">
              Edit User
            </LabeledButton>
            <LabeledButton icon="profile" size="large" iconPosition="right">
              Edit User
            </LabeledButton>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Variants" variant="wide">
          <Library.Demo title="Default" withSource>
            <LabeledButton icon="edit">Edit</LabeledButton>
            <LabeledButton icon="edit" pressed>
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" expanded>
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" disabled>
              Edit
            </LabeledButton>
          </Library.Demo>

          <Library.Demo title="Primary" withSource>
            <LabeledButton icon="edit" variant="primary">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" variant="primary">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" variant="primary">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" variant="primary">
              Edit
            </LabeledButton>
          </Library.Demo>

          <Library.Demo title="Dark" withSource>
            <LabeledButton icon="edit" variant="dark">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" pressed variant="dark">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" expanded variant="dark">
              Edit
            </LabeledButton>
            <LabeledButton icon="edit" disabled variant="dark">
              Edit
            </LabeledButton>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="LinkButton">
        <p>A button styled to look like a link (anchor tag).</p>

        <Library.Example title="Variants">
          <Library.Demo title="Default" withSource>
            <LinkButton>Show replies (10)</LinkButton>
            <LinkButton pressed>Show replies (10)</LinkButton>
            <LinkButton expanded>Show replies (10)</LinkButton>
            <LinkButton disabled>Show replies (10)</LinkButton>
          </Library.Demo>

          <Library.Demo title="Primary" withSource>
            <LinkButton variant="primary">Show replies (10)</LinkButton>
            <LinkButton variant="primary" pressed>
              Show replies (10)
            </LinkButton>
            <LinkButton variant="primary" expanded>
              Show replies (10)
            </LinkButton>
            <LinkButton variant="primary" disabled>
              Show replies (10)
            </LinkButton>
          </Library.Demo>

          <Library.Demo title="Dark" withSource>
            <LinkButton variant="dark">Show replies (10)</LinkButton>
            <LinkButton variant="dark" pressed>
              Show replies (10)
            </LinkButton>
            <LinkButton variant="dark" expanded>
              Show replies (10)
            </LinkButton>
            <LinkButton variant="dark" disabled>
              Show replies (10)
            </LinkButton>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
