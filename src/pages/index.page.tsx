import logo from '~/assets/images/logo.svg';
import '~/App.css';
import countStore, { countActions } from '~/store/count';
import button from '~/components/containers/Button';

function CountText() {
  const countSnap = useValtio(countStore);

  return (
    <span>{countSnap.count}</span>
  );
}

function CountHref() {
  const countSnap = useValtio(countStore);

  return (
    <a className="text-react-blue" href={`/id/${countSnap.count}`}>ID from count</a>
  );
}

export function Page() {
  return (
    <div className="text-center">
      <header className="App-header">
        <img src={logo} className="App-image" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            className="App-button"
            onClick={countActions.increment}
          >
            <span>count is: </span>
            <CountText />
          </button>
        </p>
        <p>
          <CountHref />
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p className="children:text-react-blue">
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <span> | </span>
          <a
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          <span> | </span>
          <a href="/about">
            About
          </a>
        </p>
      </header>
    </div>
  );
}
