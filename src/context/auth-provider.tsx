import { authApi } from "@/authApi";
import FullScreenLoading from "@/components/fullscreen-loading";
import { createContext, useEffect, useState } from "react";

export interface User {
  email: string;
  username: string;
  id: number;
}

interface AuthContextProps {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  setUser: () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.get("/api/user");
        setUser(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  async function register(email: string, username: string, password: string) {
    await authApi.post("api/register", { email, username, password });
  }

  async function login(email: string, password: string) {
    const res = await authApi.post("api/login", { email, password });
    setUser(res.data);
  }
  async function logout() {
    await authApi.post("api/logout");
    setUser(null);
  }
  if (loading) return <FullScreenLoading />;
  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
