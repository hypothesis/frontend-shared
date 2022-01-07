import classnames from 'classnames';
import Library from '../Library';

function ColorSwatch({ colorClass, colorName }) {
  return (
    <div>
      <div className={classnames(colorClass, 'w-64 h-8 mr-4')} />
      <p>
        <i>{colorName}</i>
      </p>
    </div>
  );
}

const brandExamples = (
  <>
    <ColorSwatch colorClass="bg-brand" colorName="brand" />
    <ColorSwatch colorClass="bg-brand-dark" colorName="brand-dark" />
  </>
);

const greyExamples = (
  <>
    <ColorSwatch colorClass="bg-white" colorName="white" />
    <ColorSwatch colorClass="bg-grey-0" colorName="grey-0" />
    <ColorSwatch colorClass="bg-grey-1" colorName="grey-1" />
    <ColorSwatch colorClass="bg-grey-2" colorName="grey-2" />
    <ColorSwatch colorClass="bg-grey-3" colorName="grey-3" />
    <ColorSwatch colorClass="bg-grey-4" colorName="grey-4" />
    <ColorSwatch colorClass="bg-grey-5" colorName="grey-5" />
    <ColorSwatch colorClass="bg-grey-6" colorName="grey-6" />
    <ColorSwatch colorClass="bg-grey-7" colorName="grey-7" />
    <ColorSwatch colorClass="bg-grey-8" colorName="grey-8" />
    <ColorSwatch colorClass="bg-grey-9" colorName="grey-9" />
    <ColorSwatch colorClass="bg-black" colorName="black" />
  </>
);

const stateExamples = (
  <>
    <ColorSwatch colorClass="bg-green-success" colorName="green-success" />
    <ColorSwatch colorClass="bg-yellow-notice" colorName="yellow-notice" />
    <ColorSwatch colorClass="bg-red-error" colorName="red-error" />
  </>
);

export default function ColorFoundations() {
  return (
    <Library.Page title="Colors">
      <Library.Pattern title="Brand red">
        <div className="flex flex-row flex-wrap gap-4">{brandExamples}</div>
      </Library.Pattern>

      <Library.Pattern title="Greys">
        <div className="flex flex-row flex-wrap gap-4">{greyExamples}</div>
      </Library.Pattern>

      <Library.Pattern title="State indicators">
        <div className="flex flex-row flex-wrap gap-4">{stateExamples}</div>
      </Library.Pattern>
    </Library.Page>
  );
}
