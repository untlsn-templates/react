import { subscribe } from 'valtio';
import { derive } from 'valtio/utils';
import useConst from '~/hooks/useConst';

const useProxySelector = <Proxy extends object, T>(proxy: Proxy, selector: (state: Proxy) => T) => (
  useSyncExternalStore(
    useCallback((syncSub) => subscribe(proxy, syncSub), [proxy]),
    () => selector(proxy),
  )
);

type DeriveGet<T> = (get: <R extends object>(proxy: R) => R) => T

export const useDerivedSelector = <Proxy extends object, T>(selector: DeriveGet<T>) => {
  const derived = useConst(() => derive({ selector }));

  return useSyncExternalStore(
    useCallback((syncSub) => subscribe(derived, syncSub), [derived]),
    () => derived.selector,
  );
};

export default useProxySelector;
