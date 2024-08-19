import { useCallback, useId, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { IconButton, InputGroup } from '../../components/input';
import { Select } from '../../components/input/Select';

const students = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

type Student = (typeof students)[number];

function StudentContainer({ student }: { student: Student }) {
  return (
    <div className="flex">
      <div className="rounded px-2 mr-2 bg-grey-7 text-white">{student.id}</div>
      <div className="truncate">{student.name}</div>
    </div>
  );
}

export default function App({
  buttonClasses,
  wrapperClasses = 'w-96',
}: {
  buttonClasses?: string;
  wrapperClasses?: string;
}) {
  const [selected, setSelected] = useState<Student>();
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
        <Select
          buttonId={buttonId}
          value={selected}
          onChange={setSelected}
          buttonClasses={buttonClasses}
          buttonContent={
            selected ? (
              <StudentContainer student={selected} />
            ) : (
              <>Select one…</>
            )
          }
        >
          {students.map(item => (
            <Select.Option value={item} key={item.id}>
              <StudentContainer student={item} />
            </Select.Option>
          ))}
        </Select>
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
