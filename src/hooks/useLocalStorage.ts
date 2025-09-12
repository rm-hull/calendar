import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

const localStorage = atom<Record<string, unknown> | undefined>(undefined);

type UseLocalStorageReturnType<T> = [
  T | undefined,
  (value: T | undefined) => void
];

export const useLocalStorage = <T>(
  key: string
): UseLocalStorageReturnType<T> => {
  const readValue = useCallback((): T | undefined => {
    if (typeof window === "undefined") {
      return undefined;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return undefined;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useAtom(localStorage);

  const setValue = useCallback(
    (value: T | undefined): void => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried to set localStorage key “${key}” even though no window was found.`
        );
        return;
      }
      try {
        if (value === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }

        setStoredValue((prev) => ({ ...prev, [key]: value }));
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, setStoredValue]
  );

  useEffect(() => {
    setStoredValue((prev) => ({ ...prev, [key]: readValue() }));

    const handleStorageChange = (): void => {
      setStoredValue((prev) => ({ ...prev, [key]: readValue() }));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, readValue, setStoredValue]);

  return [storedValue?.[key] as T, setValue];
};
