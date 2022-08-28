import React, { lazy, Suspense } from 'react';

const getPath = (path: string) => path
  .replace('./pages/', '') // Remove ./pages/ from start
  .replaceAll('index', '') // Remove indexes from path
  .replace(/\.[tj]sx/, '') // Remove .tsx and .jsx
  .replace(/\[.+]/, (param) => param.slice(1, -1)); // Change [param] to :param

export function getLazyRoutes(): Route[] {
  const pages = import.meta.glob('./pages/**') as Record<string, () => Promise<{ default: any }>>;

  return Object.keys(pages).map((path) => {
    const Component = lazy(pages[path]);

    return {
      path: getPath(path),
      Comp: () => (
        <Suspense fallback={<>Loading...</>}>
          <Component />
        </Suspense>
      ),
    };
  });
}

export interface Route { path: string, Comp: any }
