const getPath = (path: string) => path
  .replace('./pages', '') // Remove ./pages from start
  .replaceAll('index', '') // Remove indexes from path
  .replace(/\.[tj]sx/, '') // Remove .tsx and .jsx
  .replace(/\[.+]/, (param) => param.slice(1, -1)) // Change [param] to :param
  .replaceAll('.', ''); // remove all dots

export default getPath;
