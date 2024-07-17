import type { ComponentChildren } from 'preact';
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

function Bullet({ children }: { children: ComponentChildren }) {
  return (
    <div className="rounded px-2 ml-2 bg-grey-7 text-white">{children}</div>
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
          value ? (
            <div className="flex">
              <div className="truncate">{value.name}</div>
              <Bullet>{value.id}</Bullet>
            </div>
          ) : (
            <>Select one…</>
          )
        }
      >
        {items.map(item => (
          <Select.Option value={item} key={item.id}>
            {item.name}
            <div className="grow" />
            <Bullet>{item.id}</Bullet>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
