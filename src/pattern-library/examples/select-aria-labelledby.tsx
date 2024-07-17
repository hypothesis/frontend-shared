import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

const items = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();
  const labelId = useId();

  return (
    <div className="w-96 mx-auto">
      <p id={labelId}>Select a person with aria labelledby</p>
      <Select
        aria-labelledby={labelId}
        value={value}
        onChange={setSelected}
        buttonContent={value ? value.name : <>Select one…</>}
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
