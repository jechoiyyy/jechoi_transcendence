import { createContext, useState, useEffect, useContext, useRef } from "react";
import userService from "@api/user.api.js";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const initialized = useRef(false);

  async function fetchUser() {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const response = await userService.getCurrentUser();
      setUser(response);
    } catch (e) {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}