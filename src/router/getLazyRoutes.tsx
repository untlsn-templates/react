import { lazy } from 'react';
import routerBase from '~/router/routerBase';
import type { Route } from '~/router/types';

export default function getLazyRoutes(Loading: () => any): Route[] {
  const pages = import.meta.glob('./pages/**') as Record<string, () => Promise<{ default: any }>>;

  return Object.keys(pages).map((path) => {
    const Component = lazy(pages[path]);

    return routerBase(path, Loading, Component);
  });
}
