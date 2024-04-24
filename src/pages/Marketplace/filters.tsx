import { authApi } from "@/authApi";
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

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category_id") || "";

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: async () => {
      const res = await authApi.get("api/item/get_item_categories");
      return res.data;
    },
  });

  if (categoriesLoading) return <FullScreenLoading />;
  console.log(currentCategory);
  return (
    <div className="space-y-4">
      <div>
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
      </div>
    </div>
  );
};
export default Filters;
