import { createContext, useContext, useEffect, useRef } from 'react';

const InputContext = createContext(null);

export function InputProvider({ children }) {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
    };
    const up = (e) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return (
    <InputContext.Provider value={keys}>
      {children}
    </InputContext.Provider>
  );
}

export function useInput() {
  return useContext(InputContext);
}
