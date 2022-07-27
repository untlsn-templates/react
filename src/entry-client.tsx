import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider as _HeadProvider } from 'react-head';
import App from './App';
import 'uno.css';
import '~/assets/style/reset.css';
import { getLazyRoutes } from '~/router';

const HeadProvider = _HeadProvider as FC<{ children: any }>;

const routes = getLazyRoutes(() => 'Loading...');

const container = document.getElementById('app')!;
const entry = (
  <React.StrictMode>
    <HeadProvider>
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>
    </HeadProvider>
  </React.StrictMode>
);

// Client-side rendering in development, SSG in production
if (import.meta.env.PROD) {
  ReactDOM.hydrateRoot(container, entry);
} else {
  ReactDOM.createRoot(container).render(entry);
}
