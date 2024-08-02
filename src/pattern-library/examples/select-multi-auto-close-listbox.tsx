import { useId, useState } from 'preact/hooks';

import { MultiSelect } from '../..';

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
  const [values, setMultiSelected] = useState<ItemType[]>([]);
  const selectId = useId();

  return (
    <div className="w-96 mx-auto">
      <label htmlFor={selectId}>Select multiple students</label>
      <MultiSelect
        autoCloseListbox
        value={values}
        onChange={newValue => setMultiSelected(newValue)}
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
        {items.map(item => (
          <MultiSelect.Option value={item} key={item.id}>
            {item.name}
          </MultiSelect.Option>
        ))}
      </MultiSelect>
    </div>
  );
}
