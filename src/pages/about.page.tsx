import logo from '~/assets/images/logo.svg';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import '~/App.css';

export function Page() {
  useDocumentTitle('App about');

  return (
    <div className="text-center">
      <header className="App-header">
        <img src={logo} className="App-image" alt="logo" />
        <p>About</p>
        <p>
          <a href="/" className="text-react-blue text-lg">
            Back to home
          </a>
        </p>
      </header>
    </div>
  );
}
