import { authApi } from "@/api/authApi";
import { IEvent, IFetchFromApi } from "@/types";

export const fetchEvents = async (page: number) => {
  const response = await authApi.get<IFetchFromApi<IEvent[]>>(`api/event/?page=${page}`);
  return response.data;
};
