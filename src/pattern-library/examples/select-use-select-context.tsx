import { useEffect } from 'preact/hooks';

import { Select, useSelectContext } from '../../components/input';

function CustomOption({ value }: { value: number }) {
  const selectContext = useSelectContext();

  useEffect(() => {
    if (selectContext?.listboxOpen) {
      // Expensive logic...
    }
  }, [selectContext?.listboxOpen]);

  return <Select.Option value={value}>{value}</Select.Option>;
}

export default function App() {
  return (
    <div className="w-96">
      <Select
        value={undefined}
        onChange={() => {}}
        buttonContent="Select a value..."
      >
        <CustomOption value={1} />
        <CustomOption value={2} />
        <CustomOption value={3} />
      </Select>
    </div>
  );
}
