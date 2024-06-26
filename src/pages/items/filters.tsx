import FullScreenLoading from "@/components/fullscreen-loading";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchItemCategories } from "./item-service";
import CategorySelect from "../../components/select-category";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category_id") || "";

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["item-categories"],
    queryFn: () => fetchItemCategories(),
  });

  if (categoriesLoading) return <FullScreenLoading />;

  return (
    <div className="space-y-4">
      <div>
        <CategorySelect
          label="Category"
          placeholder="Select a category"
          categories={categories}
          value={currentCategory}
          onValueChange={(value) => {
            setSearchParams((prev) => {
              prev.delete("page"); // remove page so that page 1 is default
              prev.set("category_id", value);
              if (value == "all") prev.delete("category_id");
              return prev;
            });
          }}
        />
      </div>
    </div>
  );
};
export default Filters;
