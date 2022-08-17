import makeInspectable from 'mobx-devtools-mst';

const devtools = (root) => {
  if (import.meta.env.DEV) {
    makeInspectable(root);
  }
};

export default devtools;
