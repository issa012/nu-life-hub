import Searchbar from "@/components/searchbar";
import Filters from "./filters";
import { CreateItem } from "./create-item";
import ItemList from "./list-items";

const Marketplace = () => {
  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div className="sidebar">
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight mb-6">Marketplace</h1>
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
