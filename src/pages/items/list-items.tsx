import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchItems } from "./item-service";
import CustomPagination from "@/components/custom-pagination";
import FullScreenLoading from "@/components/fullscreen-loading";
import Item from "./item-card";

const ItemList = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = Number(searchParams.get("category_id"));
  const searchTerm = searchParams.get("search");

  const { data, isLoading } = useQuery({
    queryKey: ["marketplace-items", currentPage, category, searchTerm],
    queryFn: () => fetchItems(currentPage, category, searchTerm),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      {!isLoading ? (
        data?.count ? (
          <>
            <ul className="flex flex-row flex-wrap list-none">
              {data.results.map((item) => (
                <Item item={item} key={item.id} />
              ))}
            </ul>
            <CustomPagination currentPage={currentPage} count={data.count} />
          </>
        ) : (
          <div>No items to display</div>
        )
      ) : (
        <FullScreenLoading />
      )}
    </div>
  );
};
export default ItemList;
