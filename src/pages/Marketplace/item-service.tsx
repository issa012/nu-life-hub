import { authApi } from "@/api/authApi";
import { Category } from "@/types";

export const fetchItems = async (page: number, category: number) => {
  let queryString = `api/item/?page=${page}`;
  if (category) queryString += `&category_id=${category}`;
  const response = await authApi.get(queryString);
  return response.data;
};

export const fetchItemCategories = async () => {
  const res = await authApi.get<Category[]>("api/item/get_item_categories");
  return res.data;
};
