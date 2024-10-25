import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

const items = [
  {
    id: '1',
    name: 'All students - content is very long and will not fit the listbox',
  },
  {
    id: '2',
    name: 'Albert Banana - content is very long and will not fit the listbox',
  },
  {
    id: '3',
    name: 'Bernard California - content is very long and will not fit the listbox',
  },
  {
    id: '4',
    name: 'Cecelia Davenport - content is very long and will not fit the listbox',
  },
  {
    id: '5',
    name: 'Doris Evanescence - content is very long and will not fit the listbox',
  },
];

export default function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select a person</label>
      <Select
        value={value}
        onChange={newValue => setSelected(newValue)}
        buttonId={selectId}
        buttonContent={value ? value.name : <>Select one…</>}
        listboxClasses="w-36"
        listboxOverflow="truncate"
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
