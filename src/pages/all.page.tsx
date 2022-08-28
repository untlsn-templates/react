import { Routes } from 'react-router-dom';
import '$css';
import { Link, Title } from 'react-head';
import favicon from '~/assets/images/favicon.svg';
import type { Route as RouteType } from '~/routes';

export function Page({ routes }: { routes: RouteType[] }) {
  return (
    <>
      <Link rel="icon" type="image/svg+xml" href={favicon} />
      <Title>App</Title>
      <Routes>
        {routes.map(({ path, Comp }) => (
          <Route key={path} path={path} element={<Comp />} />
        ))}
      </Routes>
    </>
  );
}
