import { useCallback, useState } from 'preact/hooks';

import { HideIcon, RadioButton, ShowIcon } from '../..';

export default function App() {
  const [value, setSelected] = useState<'first' | 'second'>('first');
  const onChange = useCallback((e: Event) => {
    setSelected((e.target as HTMLInputElement).value as 'first' | 'second');
  }, []);

  return (
    <form className="w-64 m-auto flex flex-col">
      <RadioButton
        name="option"
        icon={HideIcon}
        checkedIcon={ShowIcon}
        value="first"
        checked={value === 'first'}
        onChange={onChange}
      >
        First {value === 'first' && <i>(checked)</i>}
      </RadioButton>
      <RadioButton
        name="option"
        icon={HideIcon}
        checkedIcon={ShowIcon}
        value="second"
        checked={value === 'second'}
        onChange={onChange}
      >
        Second {value === 'second' && <i>(checked)</i>}
      </RadioButton>
    </form>
  );
}
