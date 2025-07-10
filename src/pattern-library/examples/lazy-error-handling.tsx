import { Button, lazy } from '../../';

type ProfileProps = {
  name: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Profile({ name, description }: ProfileProps) {
  return (
    <div className="p-4 border border-green-500 rounded">
      <h3 className="text-green-700 font-bold">{name}</h3>
      <p>{description}</p>
    </div>
  );
}

let reject: (err: Error) => void;
const promise = new Promise<typeof Profile>(
  (_resolve, reject_) => (reject = reject_),
);

const LazyProfile = lazy('Profile', () => promise, {
  fallback: ({ name }) => (
    <div className="p-4 border border-gray-300 rounded">
      <p className="text-gray-500 mt-2">
        Loading {name}
        {"'"}s profile...
      </p>
    </div>
  ),
  errorFallback: ({ name }, error) => (
    <div className="p-4 border border-red-300 rounded">
      <p className="text-gray-500 mt-2">
        Unable to load {name}
        {"'"}s profile: {error.message}
      </p>
    </div>
  ),
});

export default function App() {
  return (
    <div>
      <Button
        onClick={() => reject(new Error('Something went wrong'))}
        variant="primary"
        classes="my-2"
      >
        Trigger loading error
      </Button>
      <LazyProfile
        name="Bob Parr"
        description="Robert Parr, also known as Mr. Incredible, is the husband of Helen Parr, and the father of Violet Parr, Dash Parr, and Jack-Jack Parr."
      />
    </div>
  );
}
