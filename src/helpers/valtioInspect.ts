import { devtools } from 'valtio/utils';

const valtioInspect = (stores: Record<string, object>) => {
  Object.entries(stores).forEach(([name, val]) => {
    devtools(val, { name, enabled: import.meta.env.DEV });
  });
};

export default valtioInspect;
