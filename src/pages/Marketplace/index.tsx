import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ScrollRestoration, useSearchParams } from "react-router-dom";

import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateItem } from "./create-item";
import Item from "./item";

import Searchbar from "@/components/searchbar";
import CustomPagination from "@/components/custom-pagination";
import Filters from "./filters";
import { authApi } from "@/authApi";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = Number(searchParams.get("category_id"));

  const fetchItems = async (page: number, category: number) => {
    let queryString = `api/item/?page=${page}`;
    if (category) queryString += `&category_id=${category}`;
    const response = await authApi.get(queryString);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["marketplace-items", currentPage, category],
    queryFn: () => fetchItems(currentPage, category),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div className="sidebar">
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight mb-6">Marketplace</h1>
          <Filters />
        </div>
        <div className="container space-y-4">
          <div className="flex items-center justify-between">
            <Searchbar />
            <CreateItem />
          </div>
          {!isLoading ? (
            <>
              <ul className="flex flex-row flex-wrap list-none">
                {data.results.map((item) => (
                  <Item item={item} key={item.id} />
                ))}
              </ul>
              <CustomPagination currentPage={currentPage} count={Math.ceil(data.count / 10)} />
            </>
          ) : (
            <FullScreenLoading />
          )}
        </div>
        <ScrollRestoration />
      </div>
    </div>
  );
};
export default Marketplace;
