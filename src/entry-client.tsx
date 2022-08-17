import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '$css';
import { getLazyRoutes } from '~/router';
import HeadProvider from '~/components/providers/HeadProvider';

const routes = getLazyRoutes(() => 'Loading...');

const container = document.getElementById('app')!;
const entry = (
  <HeadProvider>
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>
  </HeadProvider>
);

// Client-side rendering in development, SSG in production
if (import.meta.env.PROD) {
  ReactDOM.hydrateRoot(container, entry);
} else {
  ReactDOM.createRoot(container).render(entry);
}
