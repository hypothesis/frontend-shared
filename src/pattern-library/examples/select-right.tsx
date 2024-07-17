import type { ComponentChildren } from 'preact';
import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

const items = [
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

export default function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();
  const selectId = useId();

  return (
    <div className="mx-auto">
      <label htmlFor={selectId}>Select a person</label>
      <Select
        right
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
        buttonClasses="!w-36"
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
