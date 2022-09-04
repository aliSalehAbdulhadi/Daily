import { useEffect, EffectCallback, DependencyList, useRef } from 'react';

const useSkipFirstRender = (effect: EffectCallback, deps?: DependencyList) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: void | (() => any | undefined) = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns;
    }
  }, deps);
};

export default useSkipFirstRender;
