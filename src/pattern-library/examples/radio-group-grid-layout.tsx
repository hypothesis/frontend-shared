import { useState } from 'preact/hooks';

import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<
    'one' | 'two' | 'three' | 'four' | 'five' | 'six'
  >();

  return (
    <div className="w-full">
      <RadioGroup aria-label="Items" selected={value} onChange={setValue}>
        <div className="w-full grid grid-cols-2 gap-2">
          <RadioGroup.Radio value="one">First</RadioGroup.Radio>
          <RadioGroup.Radio value="two">Second</RadioGroup.Radio>
          <RadioGroup.Radio value="three">Third</RadioGroup.Radio>
          <RadioGroup.Radio value="four">Fourth</RadioGroup.Radio>
          <RadioGroup.Radio value="five">Fifth</RadioGroup.Radio>
          <RadioGroup.Radio value="six">Sixth</RadioGroup.Radio>
        </div>
      </RadioGroup>
    </div>
  );
}
