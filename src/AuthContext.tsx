import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  _id: string | null;
  username: string | null;
  login: (token: string, _id: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const isTokenValid = (token: string): boolean => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
    return Date.now() < exp * 1000; // Check expiration time
  } catch {
    return false; // Invalid token format
  }
};
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    return token ? isTokenValid(token) : false;
  });
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem("username")
  );

  const [_id, setID] = useState<string | null>(() =>
    localStorage.getItem("userId")
  );

  const login = (token: string, _id: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", _id);
    setIsAuthenticated(true);
    setUsername(username);
    setID(_id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUsername(null);
    setID(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, _id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
