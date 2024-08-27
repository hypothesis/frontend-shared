import { useState } from 'preact/hooks';

import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<'one' | 'two'>('one');

  return (
    <div className="w-full">
      <RadioGroup
        aria-label="Items labeled with aria-label"
        selected={value}
        onChange={setValue}
      >
        <RadioGroup.Radio value="one" subtitle="This is the first item">
          First
        </RadioGroup.Radio>
        <RadioGroup.Radio value="two" subtitle="This is the second item">
          Second
        </RadioGroup.Radio>
      </RadioGroup>
    </div>
  );
}
