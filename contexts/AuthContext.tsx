import React, { useState, useEffect, useContext, SetStateAction } from "react";
import useSecureStorage from "../hooks/useSecureStore";
import Constanst from "expo-constants";

interface defaultValue {
  currentUser: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setToken: (value: string) => void;
  jwtToken: string | null;
  logout: () => void;
}

const AuthContext = React.createContext<defaultValue>({
  currentUser: undefined,
  setUser: () => {},
  logout: () => {},
  jwtToken: null,
  setToken: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export type User = {
  email: string;
  username: string;
  id: string;
  iat: number;
  exp: number;
  avatar: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<undefined | User>();
  const [loading, setLoading] = useState<boolean>(false);
  const API_URL = Constanst.manifest?.extra?.API_URL;
  const [jwtToken, setJwtToken] = useSecureStorage("jwtToken", "");

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          ContentType: "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        switch (data.type) {
          case "success":
            setUser(data.user);
            break;
          case "danger": {
            setUser(undefined);
            console.log(data.message);
            break;
          }
        }
      }
    } catch (err) {
      console.error(err.message);
      setUser(undefined);
    }
  };

  function logout() {
    setJwtToken("");
  }

  useEffect(() => {
    setLoading(true);
    jwtToken ? fetchUser() : setUser(undefined);
    setLoading(false);
  }, [jwtToken]);

  const value = {
    currentUser: user,
    setUser,
    jwtToken,
    setToken: setJwtToken,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
