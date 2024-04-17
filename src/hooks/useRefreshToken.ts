import { authApi } from "@/authApi";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const response = await authApi.post("api/refresh", {
      withCredentials: true,
    });
    setToken((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return response.data.token;
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
