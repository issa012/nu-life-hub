import { debounce } from "lodash";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function Searchbar() {
  const [_, setSearchParams] = useSearchParams();

  const debouncedOnChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      setSearchParams((prev) => {
        if (event.target.value == "") prev.delete("search");
        else prev.set("search", event.target.value);
        prev.delete("page");
        return prev;
      });
    }, 500),
    []
  );

  return (
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by keyword..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
            onChange={debouncedOnChange}
          />
        </div>
      </form>
    </div>
  );
}
