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
  register: (email: string, name: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function register(email: string, name: string, password: string) {
    try {
      const res = await authApi.post("api/register", { email, name, password });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email: string, password: string) {
    try {
      // const res = await authApi.post("api/login", { email, password });
      setToken("token");
      setUser({ username: "yi", email: "u", token: "token" });
      redirect("/");
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
