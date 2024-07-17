import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

const items = [{ id: '1', name: 'All students' }];

export default function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select a person</label>
      <Select
        value={value}
        onChange={setSelected}
        buttonId={selectId}
        buttonContent="This is disabled"
        disabled
      >
        {items.map(item => (
          <Select.Option value={item} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
