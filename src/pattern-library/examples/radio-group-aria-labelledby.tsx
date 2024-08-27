import { useId, useState } from 'preact/hooks';

import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<'one' | 'two'>('one');
  const labelId = useId();

  return (
    <div className="w-full flex flex-col gap-2">
      <p id={labelId}>Items labeled with aria-labelledby</p>
      <RadioGroup
        aria-labelledby={labelId}
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
