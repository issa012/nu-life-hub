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
  placeholder: string;
  label: string;
};

const CategorySelect = (props: CategorySelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
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
