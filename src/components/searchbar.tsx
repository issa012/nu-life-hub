import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function Searchbar() {
  return (
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by keyword..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
          />
        </div>
      </form>
    </div>
  );
}
