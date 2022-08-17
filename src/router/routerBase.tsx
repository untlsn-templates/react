import { Suspense } from 'react';

function getPath(path: string) {
  return path
    .match(/\.\/pages\/(.*)\.tsx$/)![1]
    .replace(/index/g, '')
    .replace(/\[.+]/g, (data) => `:${data.slice(1, -1)}`);
}

export default function routerBase(path: any, Loading: any, Component: any) {
  return {
    path: getPath(path),
    Comp: () => (
      <Suspense fallback={<>Loading...</>}>
        <Component />
      </Suspense>
    ),
  };
}
