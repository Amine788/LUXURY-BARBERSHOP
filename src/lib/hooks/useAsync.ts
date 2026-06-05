import { useState, useEffect, useCallback, useRef } from "react";

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook pour exécuter une fonction async et gérer loading/error/data.
 * @param fn   La fonction async à appeler
 * @param deps Dépendances qui déclenchent un re-fetch (comme useEffect)
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data:    undefined,
    loading: true,
    error:   null,
  });

  // Compteur pour ignorer les résultats de requêtes obsolètes
  const counterRef = useRef(0);

  const execute = useCallback(() => {
    const id = ++counterRef.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => {
        if (id === counterRef.current) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (id === counterRef.current) {
          setState({ data: undefined, loading: false, error: err instanceof Error ? err : new Error(String(err)) });
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}
