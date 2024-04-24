import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateItem } from "./create-item";
import Item from "./item";

import Searchbar from "@/components/searchbar";
import CustomPagination from "@/components/custom-pagination";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const axiosPrivate = useAxiosPrivate();

  const fetchItems = async (page: number) => {
    const response = await axiosPrivate.get(`api/item/?page=${page}`);
    return response.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["marketplace-items", currentPage],
    queryFn: () => fetchItems(currentPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading || isFetching) return <FullScreenLoading />;

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div className="sidebar">
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Marketplace</h1>
        </div>
        <div className="container">
          <div className="flex items-center justify-between">
            <Searchbar />
            <CreateItem />
          </div>
          <ul className="flex flex-row flex-wrap list-none">
            {data.results.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </ul>
          <CustomPagination currentPage={currentPage} count={Math.ceil(data.count / 10)} />
        </div>
      </div>
    </div>
  );
};
export default Marketplace;
