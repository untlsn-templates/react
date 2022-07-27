import type { Route } from '~/router/types.d';
import routerBase from '~/router/routerBase';

export default function getRoutes(Loading: () => any) {
  const pages = import.meta.glob('../pages/**', { eager: true }) as Record<any, { default: any }>;
  const names = Object.keys(pages);

  return {
    names,
    routes: names.map((path) => (
      routerBase(path, Loading, pages[path].default)
    )) as Route[],
  };
}
