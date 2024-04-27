import { authApi } from "@/api/authApi";
import { Category, IEvent, IFetchFromApi } from "@/types";

export const fetchEvents = async (
  page: number,
  category_id: number | null,
  club_id: number | null,
  search: string | null,
  date: string | null
) => {
  let queryString = `api/event/?page=${page}`;

  if (category_id) queryString += `&category_id=${category_id}`;
  if (club_id) queryString += `&club_id=${club_id}`;
  if (search) queryString += `&search=${search}`;
  if (date) queryString += `&date=${date}`;

  const response = await authApi.get<IFetchFromApi<IEvent[]>>(queryString);
  return response.data;
};

export const fetchEventCategories = async () => {
  const response = await authApi.get<Category[]>("api/event/get_event_categories");
  return response.data;
};
