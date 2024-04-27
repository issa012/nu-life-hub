import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";

type CategorySelectProps = React.ComponentProps<typeof Select> & {
  categories: Category[] | undefined;
  placeholder: string | undefined;
  label: string | undefined;
};

const CategorySelect = (props: CategorySelectProps) => {
  const { placeholder = "Select category", label = "Category" } = props;
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="all">Select a category</SelectItem>
          {props.categories?.map((category) => (
            <SelectItem value={"" + category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default CategorySelect;
