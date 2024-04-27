import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const debouncedRequest = useDebounce(() => {
    setSearchParams((prev) => {
      prev.delete("page");
      if (value == "") prev.delete("search");
      else prev.set("search", value);
      return prev;
    });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    debouncedRequest();
  };

  return (
    <div className="w-full flex-1">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by keyword..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
