import { StaticRouter } from 'react-router-dom/server';
import { enableStaticRendering } from 'mobx-react-lite';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getRoutes } from '~/router';
import HeadProvider from '~/components/providers/HeadProvider';

const { routes, names } = getRoutes(() => 'Loading...');
enableStaticRendering(true);

export function render(url: string, headTags = []) {
  return renderToString(
    <HeadProvider headTags={headTags}>
      <StaticRouter location={url}>
        <App routes={routes} />
      </StaticRouter>
    </HeadProvider>,
  );
}
export { names };
