import { Button, lazy } from '../../';

type ProfileProps = {
  name: string;
  description: string;
};

function Profile({ name, description }: ProfileProps) {
  return (
    <div className="p-4 border border-green-500 rounded">
      <h3 className="text-green-700 font-bold">{name}</h3>
      <p>{description}</p>
    </div>
  );
}

let resolve: (x: typeof Profile) => void;
const promise = new Promise<typeof Profile>(resolve_ => (resolve = resolve_));

const LazyProfile = lazy('Profile', () => promise, {
  fallback: ({ name }) => (
    <div className="p-4 border border-gray-300 rounded">
      <p className="text-gray-500 mt-2">
        Loading {name}
        {"'"}s profile...
      </p>
    </div>
  ),
});

export default function App() {
  return (
    <div>
      <Button onClick={() => resolve(Profile)} variant="primary" classes="my-2">
        Finish loading
      </Button>
      <LazyProfile
        name="Bob Parr"
        description="Robert Parr, also known as Mr. Incredible, is the husband of Helen Parr, and the father of Violet Parr, Dash Parr, and Jack-Jack Parr."
      />
    </div>
  );
}
