import { useState } from 'preact/hooks';

import type { RichCheckboxProps } from '../../../../components/input/RichCheckbox';
import RichCheckbox from '../../../../components/input/RichCheckbox';
import Library from '../../Library';

function RichCheckbox_({
  children,
  initialChecked = false,
  subtitle,
}: Omit<RichCheckboxProps, 'checked' | 'onChange'> & {
  initialChecked?: boolean;
}) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <RichCheckbox checked={checked} onChange={setChecked} subtitle={subtitle}>
      {children}
    </RichCheckbox>
  );
}

export default function CheckboxPage() {
  return (
    <Library.Page
      title="RichCheckbox"
      intro={
        <>
          <p>
            <code>RichCheckbox</code> is an opinionated controlled{' '}
            <code>
              [role={'"'}checkbox{'"'}]
            </code>{' '}
            component that includes a checkbox icon next to some content.
          </p>
          <p>
            It has predefined hover and checked styles, like the individual{' '}
            <code>Radio</code>s inside{' '}
            <Library.Link href="/input-radio-group">
              <code>RadioGroup</code>
            </Library.Link>
            .
          </p>
        </>
      }
    >
      <Library.SectionL2>
        <Library.Usage symbolName="RichCheckbox" />
        <Library.SectionL3>
          <Library.Demo title="Basic RichCheckbox" withSource>
            <div className="flex flex-col gap-y-2">
              <RichCheckbox_>Click me</RichCheckbox_>
              <RichCheckbox_ subtitle="This one includes a subtitle">
                Click me
              </RichCheckbox_>
            </div>
          </Library.Demo>
        </Library.SectionL3>
      </Library.SectionL2>

      <Library.SectionL2 title="Component API">
        <Library.SectionL3 title="checked">
          <Library.Info>
            <Library.InfoItem label="description">
              Set whether the <code>RichCheckbox</code> is checked.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`boolean`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="children">
          <Library.Info>
            <Library.InfoItem label="description">
              Main content of the checkbox. Will be displayed next to check
              checkbox icon, and vertically aligned with it.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`ComponentChildren`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="onChange">
          <Library.Info>
            <Library.InfoItem label="description">
              Callback invoked check the <code>checked</code> value changes.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`(checked: boolean) => void`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="subtitle">
          <Library.Info>
            <Library.InfoItem label="description">
              If provided, it will show extra content in a lighter font color,
              right below the main content, and aligned to the left with it.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`ComponentChildren`}</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>{`undefined`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
      </Library.SectionL2>
    </Library.Page>
  );
}
