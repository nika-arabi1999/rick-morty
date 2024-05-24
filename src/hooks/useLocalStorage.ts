import { useEffect, useState } from "react";


export default function useLocalStorage(
  key: string,
  initialState: any
) {
  const [value, setValue] = useState<any>(() => {
    return JSON.parse(localStorage.getItem(key)!) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
