import { useId, useState } from 'preact/hooks';

import { SelectNext } from '../..';

type ItemType = {
  id: string;
  name: string;
};

const items: ItemType[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App() {
  const [values, setSelected] = useState<ItemType[]>([items[0], items[3]]);
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select students</label>
      <SelectNext
        multiple
        value={values}
        onChange={setSelected}
        buttonId={selectId}
        buttonContent={
          values.length === 0 ? (
            <>All students</>
          ) : values.length === 1 ? (
            values[0].name
          ) : (
            <>{values.length} students selected</>
          )
        }
      >
        <SelectNext.Option value={undefined}>All students</SelectNext.Option>
        {items.map(item => (
          <SelectNext.Option value={item} key={item.id}>
            {item.name}
          </SelectNext.Option>
        ))}
      </SelectNext>
    </div>
  );
}
