import { authApi } from "@/api/authApi";
import { Category, IFetchFromApi, IJob } from "@/types";
import { IVacancyForm } from "./create";

export const fetchJobs = async (
  page: number,
  selectedCategory: number | null,
  searchTerm: string | null
) => {
  let queryString = `api/vacancy/?page=${page}`;

  if (selectedCategory) queryString += `&category_id=${selectedCategory}`;
  if (searchTerm) queryString += `&search=${searchTerm}`;

  const res = await authApi.get<IFetchFromApi<IJob[]>>(queryString);
  return res.data;
};

export const fetchJobCategories = async () => {
  const res = await authApi.get<Category[]>("api/vacancy/get_vacancy_categories/");
  return res.data;
};

export const createVacancy = async (values: IVacancyForm) => {
  return await authApi.post("api/item/", values);
};
