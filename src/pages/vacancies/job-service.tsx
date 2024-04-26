import { authApi } from "@/api/authApi";
import { IFetchFromApi, IJob } from "@/types";

export const fetchJobs = async (page: number) => {
  const res = await authApi.get<IFetchFromApi<IJob[]>>(`api/vacancy/?page=${page}`);
  return res.data;
};
