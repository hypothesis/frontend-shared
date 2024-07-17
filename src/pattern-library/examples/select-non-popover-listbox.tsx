import { useId, useState } from 'preact/hooks';

import { Select } from '../..';

type ItemType = {
  id: string;
  name: string;
  disabled?: boolean;
};

const items: ItemType[] = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App() {
  const [value, setValue] = useState<ItemType>();
  const buttonId = useId();

  return (
    <div className="w-full">
      <p>
        When not using the <code>popover</code> API, the listbox may be clipped
        by parent elements that are styled to hide overflow.
      </p>
      <div className="w-96 h-32 mx-auto overflow-auto">
        <>
          <label htmlFor={buttonId}>Select a person</label>
          <Select
            listboxAsPopover={false}
            buttonId={buttonId}
            value={value}
            onChange={setValue}
            buttonContent={
              value ? (
                <>
                  <div className="flex">
                    <div className="truncate">{value.name}</div>
                    <div className="rounded px-2 ml-2 bg-grey-7 text-white">
                      {value.id}
                    </div>
                  </div>
                </>
              ) : (
                <>Select one…</>
              )
            }
          >
            {items.map(item => (
              <Select.Option
                value={item}
                key={item.id}
                disabled={item.disabled}
              >
                {item.name}
                <div className="grow" />
                <div className="rounded px-2 ml-2 text-white bg-grey-7">
                  {item.id}
                </div>
              </Select.Option>
            ))}
          </Select>
        </>
      </div>
    </div>
  );
}
