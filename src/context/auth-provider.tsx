import { authApi } from "@/authApi";
import { createContext, useState } from "react";
import { redirect } from "react-router-dom";

export interface User {
  email: string;
  username: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  setToken: () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function register(email: string, username: string, password: string) {
    try {
      const res = await authApi.post("api/register", { email, username, password });
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email: string, password: string) {
    try {
      const res = await authApi.post("api/login", { email, password });
      setToken(res.data.access_token);
    } catch (error) {
      console.log(error);
    }
  }
  async function logout() {
    await authApi.post("api/logout");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
