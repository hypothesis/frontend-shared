import { useState } from 'preact/hooks';

import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<'one' | 'two' | 'three'>('two');

  return (
    <div className="w-full">
      <RadioGroup
        aria-label="Items"
        selected={value}
        onChange={setValue}
        disabled
      >
        <RadioGroup.Radio value="one" subtitle="This is the first item">
          First
        </RadioGroup.Radio>
        <RadioGroup.Radio value="two" subtitle="This is the second item">
          Second
        </RadioGroup.Radio>
        <RadioGroup.Radio value="three" subtitle="This is the third item">
          Third
        </RadioGroup.Radio>
      </RadioGroup>
    </div>
  );
}
