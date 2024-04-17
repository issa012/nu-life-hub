import axios from "axios";

// const BASE_URL = "http://130.211.94.133:1337";
const BASE_URL = "http://localhost:1337";

export const authApi = axios.create({ baseURL: BASE_URL, withCredentials: true });
authApi.defaults.headers.common["Content-Type"] = "application/json";
