import { ScrollRestoration } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateItem } from "./create-item";
import Item from "./item";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const apiClient = useAxiosPrivate();

  const fetchItems = async (page: number | string) => {
    const response = await apiClient.get(`api/item/?page=${page}`);
    return response.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["marketplace-items", currentPage],
    queryFn: () => fetchItems(currentPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading || isFetching) return <FullScreenLoading />;

  console.log(data);
  console.log(currentPage);
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Marketplace</h1>
      <div>
        <CreateItem />
      </div>
      <div className="">
        <ul className="flex flex-row flex-wrap list-none">
          {data.results.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious to={`?page=${+currentPage - 1}`} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext to={`?page=${+currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ScrollRestoration />
    </div>
  );
};
export default Marketplace;
