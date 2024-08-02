import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

type ItemType = {
  id: string;
  name: string;
};

const items: ItemType[] = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App() {
  const [value, setSelected] = useState<ItemType>();
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select one student</label>
      <Select
        autoCloseListbox={false}
        value={value}
        onChange={newValue => setSelected(newValue)}
        buttonId={selectId}
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
