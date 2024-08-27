import { useState } from 'preact/hooks';

import { Button } from '../../components/input';
import RadioGroup from '../../components/input/RadioGroup';

export default function App() {
  const [value, setValue] = useState<'one' | 'two' | 'three'>('one');
  const [submitResult, setSubmitResult] = useState<Record<string, unknown>>();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formDataObj: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    setSubmitResult(formDataObj);
  };

  return (
    <form className="w-full space-y-3" onSubmit={handleSubmit}>
      <RadioGroup
        name="item"
        aria-label="Items"
        selected={value}
        onChange={setValue}
      >
        <RadioGroup.Radio value="one" subtitle="This is the first item">
          First
        </RadioGroup.Radio>
        <RadioGroup.Radio value="two" subtitle="This is the second item">
          Second
        </RadioGroup.Radio>
        <RadioGroup.Radio value="three" subtitle="This is the third item">
          Third
        </RadioGroup.Radio>
      </RadioGroup>
      <Button type="submit">Submit</Button>
      {submitResult && <pre>{JSON.stringify(submitResult, null, 2)}</pre>}
    </form>
  );
}
