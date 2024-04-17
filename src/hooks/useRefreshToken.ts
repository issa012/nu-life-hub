import { authApi } from "@/authApi";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const response = await authApi.get("/refresh", {
      withCredentials: true,
    });
    setToken((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return response.data.accessToken;
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
