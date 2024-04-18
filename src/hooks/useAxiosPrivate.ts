import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { authApi } from "@/authApi";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { token } = useAuth();

  useEffect(() => {
    const requestIntercept = authApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = authApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return authApi(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authApi.interceptors.request.eject(requestIntercept);
      authApi.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return authApi;
};

export default useAxiosPrivate;
