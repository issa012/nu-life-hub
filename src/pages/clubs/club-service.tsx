import { authApi } from "@/api/authApi";

export const fetchAllClubs = async () => {
  const response = await authApi.get(`api/club/`);
  return response.data;
};
