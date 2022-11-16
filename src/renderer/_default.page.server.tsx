import React from 'react';
import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import type { PageContext } from '~/renderer/types';
import App from '~/renderer/App';
import favicon from '~/assets/images/favicon.svg';

export const passToClient = ['pageProps', 'documentProps', 'routeParams'];

export async function render(pageContext: PageContext) {
  pageContext.documentProps ||= {};

  const getPage = (page: any = '') => escapeInject`<!DOCTYPE html>
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" href="${favicon}" type="image/x-icon">
          <title>${pageContext.documentProps?.title || 'App'}</title>
        </head>
      <body>
        <div id="root">${page}</div>
      </body>
    </html>`;

  if (!pageContext.Page) {
    return getPage();
  }

  const pageHtml = renderToString(<App {...pageContext} />);

  return getPage(dangerouslySkipEscape(pageHtml));
}
