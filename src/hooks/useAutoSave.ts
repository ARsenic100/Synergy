import { useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

export function useAutoSave<T extends Record<string, any>>(
  watch: UseFormWatch<T>,
  storageKey: string,
  delay: number = 1000
) {
  useEffect(() => {
    const subscription = watch((value) => {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }, delay);

      return () => clearTimeout(timeoutId);
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey, delay]);
}