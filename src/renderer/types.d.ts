import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';
import type PageContext from '~/renderer/PageContext';

type MaybePromise<T> = T | Promise<T>

export type OnBeforeRender<PageProps = any> = (pageContext: PageContext) => MaybePromise<{ pageContext: Partial<PageContext<PageProps>>, }>

export interface PageContext<PageProps = any> extends PageContextBuiltIn, PageContextBuiltInClient {
  pageProps: PageProps,
  documentProps: {
    title?: string
  }
}
