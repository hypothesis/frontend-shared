import { useId, useState } from 'preact/hooks';

import { SelectNext } from '../..';

const items = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select a person</label>
      <SelectNext
        value={value}
        onChange={setSelected}
        buttonId={selectId}
        buttonContent={value ? value.name : <>Select one…</>}
      >
        {items.map(item => (
          <SelectNext.Option value={item} key={item.id}>
            {item.name}
          </SelectNext.Option>
        ))}
      </SelectNext>
    </div>
  );
}
