import { useCallback, useState } from 'preact/hooks';

import { RadioButton } from '../..';

export default function App() {
  const [value, setSelected] = useState<'one' | 'two' | 'three'>();
  const onChange = useCallback((e: Event) => {
    setSelected(
      (e.target as HTMLInputElement).value as 'one' | 'two' | 'three',
    );
  }, []);

  return (
    <form className=" flex flex-col">
      <RadioButton
        name="option"
        value="one"
        checked={value === 'one'}
        onChange={onChange}
      >
        Click me
      </RadioButton>
      <RadioButton
        name="option"
        value="two"
        checked={value === 'two'}
        onChange={onChange}
      >
        No, click me
      </RadioButton>
      <RadioButton
        name="option"
        value="three"
        checked={value === 'three'}
        disabled
      >
        Disabled
      </RadioButton>
    </form>
  );
}
