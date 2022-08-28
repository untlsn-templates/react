import React, { lazy, Suspense } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import type PageContext from '~/renderer/types';
import getPath from '~/helpers/getPath';

const pages = import.meta.glob('../pages/**') as Record<string, () => Promise<{ default: any }>>;

const routes = Object.keys(pages).map((path) => {
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

export async function render({ Page }: PageContext) {
  hydrateRoot(
    document.getElementById('root')!,
    <HeadProvider>
      <BrowserRouter>
        <Page routes={routes} />
      </BrowserRouter>
    </HeadProvider>,
  );
}
