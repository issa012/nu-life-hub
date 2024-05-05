import { authApi } from "@/api/authApi";
import { Category, IEvent, IFetchFromApi } from "@/types";
import { IEventForm } from "./create-event";

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

export const createEvent = async (values: IEventForm) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("user", "" + values.user);
  formData.append("club_id", "" + values.club);
  formData.append("description", values.description);
  formData.append("category", values.category);
  formData.append("date", values.date);
  formData.append("location", values.location);
  formData.append("image_url", values.image_url);

  await authApi.post("api/event/", values, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
