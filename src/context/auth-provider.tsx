import { authApi, setHeaderToken } from "@/api/authApi";
import FullScreenLoading from "@/components/fullscreen-loading";
import { User } from "@/types";
import { createContext, useEffect, useState } from "react";

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
    const { data } = await authApi.post("api/login", { email, password });
    setHeaderToken(data.access_token);
    setUser(data.user_data);
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
