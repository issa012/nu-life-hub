import { authApi } from "@/api/authApi";
import { Category, IItem, IFetchFromApi } from "@/types";

export const fetchItems = async (page: number, category: number, searchTerm: string | null) => {
  let queryString = `api/item/?page=${page}`;
  if (category) queryString += `&category_id=${category}`;
  if (searchTerm) queryString += `&search=${searchTerm}`;
  const response = await authApi.get<IFetchFromApi<IItem[]>>(queryString);
  return response.data;
};

export const fetchItemCategories = async () => {
  const res = await authApi.get<Category[]>("api/item/get_item_categories");
  return res.data;
};

export const fetchItem = async (id: string) => {
  let queryString = `api/item/${id}`;
  const response = await authApi.get<IItem>(queryString);
  return response.data;
};
