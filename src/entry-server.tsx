import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HeadProvider as _HeadProvider } from 'react-head';
import { FC } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';
import App from './App';
import { getRoutes } from '~/router';

const { routes, names } = getRoutes(() => 'Loading...');
enableStaticRendering(true);

const HeadProvider = _HeadProvider as FC<{ headTags: any[], children: any }>;

export function render(url: string, headTags = []) {
  return ReactDomServer.renderToString(
    <HeadProvider headTags={headTags}>
      <StaticRouter location={url}>
        <App routes={routes} />
      </StaticRouter>
    </HeadProvider>,
  );
}
export { names };
