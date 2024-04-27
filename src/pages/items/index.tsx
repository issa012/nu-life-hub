import Searchbar from "@/components/searchbar";
import Filters from "./filters";
import { CreateItem } from "./create-item";
import ItemList from "./list-items";

const Marketplace = () => {
  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Marketplace</h1>
          <Filters />
        </div>
        <div className="container space-y-4">
          <div className="flex items-center justify-between">
            <Searchbar />
            <CreateItem />
          </div>
          <ItemList />
        </div>
      </div>
    </div>
  );
};
export default Marketplace;
