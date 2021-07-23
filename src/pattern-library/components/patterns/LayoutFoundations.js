import Library from '../Library';

export default function LayoutFoundations() {
  const scaleUnits = [
    '0',
    '0.125rem',
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem (default unit)',
    '1.5rem',
    '2rem',
    '4rem',
    '8rem',
  ];
  return (
    <Library.Page title="Layout">
      <Library.Pattern title="Spacing Units">
        <p>
          Spacing units provide a way to apply predefined, consistent spacing
          dimensions between (margins) and around (padding) elements. Our
          spacing is based on a <code>1rem</code> foundational unit.
        </p>
        <div className="hyp-u-vertical-spacing">
          {scaleUnits.map((unitLength, idx) => (
            <div
              key={idx}
              className={`hyp-u-layout-row hyp-u-bg-color--grey-5 hyp-u-horizontal-spacing--${idx}`}
            >
              <div
                className="hyp-u-bg-color--white"
                style={{ paddingRight: '1rem' }}
              >
                <strong>{idx}</strong>
              </div>
              <div
                className="hyp-u-bg-color--white hyp-u-stretch"
                style={{ paddingLeft: '1rem' }}
              >
                <code>{unitLength}</code>
              </div>
            </div>
          ))}
        </div>
      </Library.Pattern>
    </Library.Page>
  );
}
