import { createContext } from 'react';
import type { PageContext } from '~/renderer/types';

export const PageCtx = createContext({} as PageContext);

export const usePageContext = () => useContext(PageCtx);
export const usePageProps = <T = any>(): T => useContext(PageCtx).pageProps;
export const useDocumentProps = () => useContext(PageCtx).documentProps;
export const useRouteParams = <T extends object = any>() => useContext(PageCtx).routeParams;
export const useParams = () => useContext(PageCtx).routeParams;
export const usePathname = () => {
  const path = useContext(PageCtx).urlPathname;
  return path == '/'
    ? '/'
    : path.replace(/\/+$/, '');
};
export const useQueryArray = <T extends string>(): Record<T, string[]> => useContext(PageCtx).urlParsed.searchAll;
export const useQueryString = <T extends string>(): Record<T, string> => useContext(PageCtx).urlParsed.search;
