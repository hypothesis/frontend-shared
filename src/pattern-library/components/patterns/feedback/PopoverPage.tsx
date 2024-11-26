import { Link } from '../../../../components/navigation';
import Library from '../../Library';

export default function PopoverPage() {
  return (
    <Library.Page
      title="Popover"
      intro={
        <>
          <p>
            <code>Popover</code> is a floating element rendered above other
            content and positioned next to an anchor element.
          </p>
        </>
      }
    >
      <Library.Section
        title="Popover"
        intro={
          <>
            <p>
              By default, <code>Popover</code> will be displayed below the
              anchor element, unless there is not enough space below.
            </p>
            <p>
              It will always be at least as wide as the anchor element, but it
              can grow to fit its content if needed. However, it will never grow
              beyond the viewport.
            </p>
            <p>
              In browsers that support it, <code>Popover</code> uses the{' '}
              <Link
                target="_blank"
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover"
              >
                <code>popover</code>
              </Link>{' '}
              attribute and gets toggled via{' '}
              <Link
                target="_blank"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
              >
                popover API
              </Link>
              . Otherwise, it is rendered as an absolute-positioned element, so
              it is recommended to wrap it and its anchor element in a
              relative-positioned container.
            </p>
          </>
        }
      >
        <Library.Pattern>
          <Library.Usage symbolName="Popover" />
          <Library.Example>
            <Library.Demo
              title="Basic Popover"
              exampleFile="popover-basic"
              withSource
            />
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Popover component API">
          <Library.Example title="align">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines to which side of the anchor element the popover
                should be aligned.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'left' | 'right'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'left'"}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Right-aligned Popover"
              exampleFile="popover-right"
              withSource
            />
          </Library.Example>
          <Library.Example title="anchorElementRef">
            <Library.Info>
              <Library.InfoItem label="description">
                A reference to the element to which the popover should anchor,
                which will be used to calculate the popover size and
                positioning.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'RefObject<HTMLElement | undefined>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="asNativePopover">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines if the{' '}
                <Link
                  target="_blank"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
                >
                  popover API
                </Link>{' '}
                should be used. It{"'"}s mainly used as a test seam, but can be
                used to explicitly disable use of the native popover API.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>true</code> if the browser supports <code>[popover]</code>
                . Otherwise it is <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="classes">
            <Library.Info>
              <Library.InfoItem label="description">
                Additional CSS classes to pass to the popover.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="onClose">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked when the popover is automatically closed by
                clicking away or pressing <code>Escape</code>.
                <br />
                The caller should use this callback to keep local state in sync,
                so that the popover is re-rendered with <code>open</code> set to{' '}
                <code>false</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'() => void'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="open">
            <Library.Info>
              <Library.InfoItem label="description">
                Whether the <code>Popover</code> is currently open or not.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="restoreFocusOnClose">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines if focus should be restored when the{' '}
                <code>Popover</code> is closed.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>true</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the <code>Popover</code> style variant.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'panel' | 'custom'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'panel'"}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Custom Popover"
              exampleFile="popover-custom"
              withSource
            />
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
