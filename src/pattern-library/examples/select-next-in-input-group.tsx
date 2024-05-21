import classnames from 'classnames';
import { useCallback, useId, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { IconButton, InputGroup } from '../../components/input';
import SelectNext from '../../components/input/SelectNext';

const students = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

export default function App({
  buttonClasses,
  wrapperClasses = 'w-96',
}: {
  buttonClasses?: string;
  wrapperClasses?: string;
}) {
  const [selected, setSelected] = useState<(typeof students)[number]>();
  const selectedIndex = useMemo(
    () => (!selected ? -1 : students.findIndex(item => item === selected)),
    [selected],
  );
  const next = useCallback(() => {
    const newIndex = selectedIndex + 1;
    setSelected(students[newIndex] ?? selected);
  }, [selected, selectedIndex]);
  const previous = useCallback(() => {
    const newIndex = selectedIndex - 1;
    setSelected(students[newIndex] ?? selected);
  }, [selected, selectedIndex]);
  const buttonId = useId();

  return (
    <div className={wrapperClasses}>
      <label htmlFor={buttonId}>Select a person</label>
      <InputGroup>
        <IconButton
          icon={ArrowLeftIcon}
          title="Previous student"
          variant="dark"
          onClick={previous}
          disabled={selectedIndex <= 0}
        />
        <SelectNext
          buttonId={buttonId}
          value={selected}
          onChange={setSelected}
          buttonClasses={buttonClasses}
          buttonContent={
            selected ? (
              <div className="flex">
                <div className="truncate">{selected.name}</div>
                <div className="rounded px-2 ml-2 bg-grey-7 text-white">
                  {selected.id}
                </div>
              </div>
            ) : (
              <>Select one…</>
            )
          }
        >
          {students.map(item => (
            <SelectNext.Option value={item} key={item.id}>
              {item.name}
              <div className="grow" />
              <div
                className={classnames('rounded px-2 ml-2 text-white bg-grey-7')}
              >
                {item.id}
              </div>
            </SelectNext.Option>
          ))}
        </SelectNext>
        <IconButton
          icon={ArrowRightIcon}
          title="Next student"
          variant="dark"
          onClick={next}
          disabled={selectedIndex >= students.length - 1}
        />
      </InputGroup>
    </div>
  );
}
