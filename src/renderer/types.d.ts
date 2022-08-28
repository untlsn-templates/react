import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import type { FC } from 'react';
import type { Route } from '~/routes';

interface PageContext extends PageContextBuiltIn {
  Page: FC<{ routes: Route[] }>
}

export default PageContext;
