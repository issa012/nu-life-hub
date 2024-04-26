import FullScreenLoading from "@/components/fullscreen-loading";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchItemCategories } from "./item-service";
import CategorySelect from "../../components/select-category";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category_id") || "";

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: () => fetchItemCategories(),
  });

  if (categoriesLoading) return <FullScreenLoading />;

  return (
    <div className="space-y-4">
      <div>
        <CategorySelect
          categories={categories}
          value={currentCategory}
          onValueChange={(value) => {
            if (value == "all") {
              setSearchParams((prev) => {
                prev.delete("category_id");
                return prev;
              });
              return;
            }
            setSearchParams({ category_id: value });
          }}
        />
      </div>
    </div>
  );
};
export default Filters;
