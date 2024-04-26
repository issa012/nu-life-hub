import FullScreenLoading from "@/components/fullscreen-loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchItemCategories } from "./item-service";

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
        {categories ? (
          <Select
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
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">Select a category</SelectItem>
                {categories.map((category) => (
                  <SelectItem value={"" + category.id} key={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
};
export default Filters;
