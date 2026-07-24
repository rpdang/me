import { useActiveSectionContext } from '@/context/active-section-context';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useInView } from 'react-intersection-observer';
import type { SectionName } from './types';

export function useIsMobile(breakpoint = 640) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
      query.addEventListener('change', onStoreChange);
      return () => query.removeEventListener('change', onStoreChange);
    },
    [breakpoint]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
    [breakpoint]
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useSectionInView(sectionName: SectionName, threshold = 0.5) {
  const { ref, inView } = useInView({ threshold });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return { ref };
}
