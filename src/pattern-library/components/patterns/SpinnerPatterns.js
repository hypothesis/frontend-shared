import Library from '../Library';

import { SvgIcon } from '../../..';

export default function SpinnerPatterns() {
  return (
    <Library.Page title="Spinners">
      <p>
        The <code>spinner</code> pattern can be used to show loading states. It
        is an animated SVG.
      </p>
      <Library.Pattern title="Spinner">
        <p>
          The spinner is <code>em-sized</code>; it renders at <code>1em</code>{' '}
          square, by default. Other relative sizes are available as shown. For
          manual sizing control, adjust the font-size of a parent element.
          Spinners have a default foreground color, which may be overridden with
          utility classes.
        </p>
        <Library.Example title="Default size">
          <p>
            At its default size, the spinner is <code>2em</code> square.
          </p>
          <Library.Demo withSource>
            <SvgIcon name="hyp-spinner" className="hyp-spinner" />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Small size">
          <p>
            Small spinners are <code>1em</code> square and can be used inline.
          </p>
          <Library.Demo withSource>
            <SvgIcon name="hyp-spinner" className="hyp-spinner--small" />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Large size">
          <p>
            Large spinners are <code>4em</code> square.
          </p>
          <Library.Demo withSource>
            <SvgIcon name="hyp-spinner" className="hyp-spinner--large" />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Changing color">
          <p>
            The color of the spinner may be changed by use of utility classes.
          </p>
          <Library.Demo withSource>
            <SvgIcon
              name="hyp-spinner"
              className="hyp-spinner hyp-u-color--brand"
            />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
