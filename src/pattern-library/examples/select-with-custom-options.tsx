import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

type Item = {
  id: string;
  name: string;
};

const defaultItems: Item[] = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

function ItemContainer({ item }: { item: Item }) {
  return (
    <div className="flex">
      <div className="rounded px-2 mr-2 bg-grey-7 text-white">{item.id}</div>
      <div className="truncate">{item.name}</div>
    </div>
  );
}

export default function App({ items = defaultItems }: { items?: Item[] }) {
  const [value, setSelected] = useState<Item>();
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select a person</label>
      <Select
        value={value}
        onChange={setSelected}
        buttonId={selectId}
        buttonContent={
          value ? <ItemContainer item={value} /> : <>Select one…</>
        }
      >
        {items.map(item => (
          <Select.Option value={item} key={item.id}>
            <ItemContainer item={item} />
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
