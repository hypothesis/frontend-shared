import { useState } from 'preact/hooks';

import RadioButtonGroup from '../../components/input/RadioButtonGroup';

export default function App() {
  const [horizontalValue, setHorizontalValue] = useState<
    'one' | 'two' | 'three'
  >('one');
  const [verticalValue, setVerticalValue] = useState<'one' | 'two' | 'three'>(
    'two',
  );

  return (
    <div className="w-full">
      <p className="font-bold">Grouped horizontally:</p>
      <RadioButtonGroup
        selected={horizontalValue}
        onChange={setHorizontalValue}
        inputs={[
          {
            value: 'one',
            label: 'First',
            subtitle: 'This is the first item',
          },
          {
            value: 'two',
            label: 'Second',
            subtitle: 'This is the second item',
          },
          {
            value: 'three',
            label: 'Third',
            subtitle: 'This is the third item',
          },
        ]}
      />

      <p className="font-bold mt-5">Grouped vertically:</p>
      <RadioButtonGroup
        selected={verticalValue}
        onChange={setVerticalValue}
        direction="vertical"
        inputs={[
          {
            value: 'one',
            label: 'First',
            subtitle: 'This is the first item',
          },
          {
            value: 'two',
            label: 'Second',
            subtitle: 'This is the second item',
          },
          {
            value: 'three',
            label: 'Third',
            subtitle: 'This is the third item',
          },
        ]}
      />
    </div>
  );
}
