import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const BASE_URL = "http://130.211.94.133:1337";

export const authApi = axios.create({ baseURL: BASE_URL, withCredentials: true });
authApi.defaults.headers.common["Content-Type"] = "application/json";

export const setHeaderToken = (token: string) => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  //client.defaults.headers.common.Authorization = null;
  delete authApi.defaults.headers.common.Authorization;
};

export const fetchNewToken = async () => {
  try {
    const token: string = await authApi.post("api/refresh").then((res) => res.data.token);
    return token;
  } catch (error) {
    return null;
  }
};

export const refreshAuth = async (failedRequest: any) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
    setHeaderToken(newToken);
    // you can set your token in storage too
    // setToken({ token: newToken });
    return Promise.resolve(newToken);
  } else {
    // you can redirect to login page here
    // router.push("/login");
    return Promise.reject();
  }
};

createAuthRefreshInterceptor(authApi, refreshAuth, {
  statusCodes: [403], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});
