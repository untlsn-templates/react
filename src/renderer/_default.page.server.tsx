import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import { HeadProvider } from 'react-head';
import type PageContext from '~/renderer/types';
import getPath from '~/helpers/getPath';

const pages = import.meta.glob('../pages/**', { eager: true }) as Record<string, { default: any }>;

const routes = Object.keys(pages).map((path) => {
  const Component = pages[path].default;

  return {
    path: getPath(path),
    Comp: () => (
      <Suspense fallback={<>Loading...</>}>
        <Component />
      </Suspense>
    ),
  };
});

export async function render({ Page, urlOriginal }: PageContext) {
  const headTags = [];
  const pageHtml = renderToString(
    <HeadProvider headTags={headTags}>
      <StaticRouter location={urlOriginal}>
        <Page routes={routes} />
      </StaticRouter>
    </HeadProvider>,
  );
  return escapeInject`<!DOCTYPE html>
    <html lang="pl">
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
