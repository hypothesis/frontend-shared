import { useState } from 'preact/hooks';

import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<'one' | 'two' | 'three' | 'four'>('two');

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        Currently selected value: <b>{value}</b>
      </div>
      <RadioGroup
        aria-label="Items"
        selected={value}
        onChange={setValue}
        direction="vertical"
      >
        <RadioGroup.Radio value="one" subtitle="This is the first item">
          First
        </RadioGroup.Radio>
        <RadioGroup.Radio value="two" subtitle="This is the second item">
          Second
        </RadioGroup.Radio>
        <RadioGroup.Radio
          value="three"
          subtitle="This item is disabled"
          disabled
        >
          Third
        </RadioGroup.Radio>
        <RadioGroup.Radio value="four" subtitle="This is the fourth item">
          Fourth
        </RadioGroup.Radio>
      </RadioGroup>
    </div>
  );
}
