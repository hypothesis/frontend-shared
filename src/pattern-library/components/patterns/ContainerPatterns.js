import { useState } from 'preact/hooks';

import { LabeledButton } from '../../../';
import Library from '../Library';

export default function ContainerPatterns() {
  const [showModalExample, setShowModalExample] = useState(false);
  return (
    <Library.Page title="Containers">
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
                  <div className="border p-3 bg-white">
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
                    <div className="flex justify-end p-2">
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
    </Library.Page>
  );
}
