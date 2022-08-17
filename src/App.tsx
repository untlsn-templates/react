import { Routes } from 'react-router-dom';
import '$css';
import { Link, Title } from 'react-head';
import type { Route as RouteType } from '~/router';
import favicon from '~/assets/images/favicon.svg';

export default function App({ routes }: { routes: RouteType[] }) {
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
