import { subscribe } from 'valtio';
import { subscribeKey } from 'valtio/utils';

const useValtioSubscribe = <Proxy extends object, Key extends keyof Proxy>(
  proxy: Proxy,
  callback: () => void,
  options: { deps?: any[], notifyInSync?: boolean, } = {},
) => {
  useEffect(() => {
    const unsub = subscribe(proxy, callback, options.notifyInSync);
    return () => {
      unsub();
    };
  }, options.deps || []);
};

export const useValtioSubscribeKey = <Proxy extends object, Key extends keyof Proxy>(
  proxy: Proxy,
  key: Key,
  callback: (value: Proxy[Key]) => void,
  options: { deps?: any[], notifyInSync?: boolean, } = {},
) => {
  useEffect(() => {
    const unsub = subscribeKey(proxy, key, callback, options.notifyInSync);
    return () => {
      unsub();
    };
  }, options.deps || []);
};

export default useValtioSubscribe;
