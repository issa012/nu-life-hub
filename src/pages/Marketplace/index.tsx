import { useQuery } from "@tanstack/react-query";
import Item from "./item";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateItem } from "./create-item";

const Marketplace = () => {
  const apiClient = useAxiosPrivate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["marketplace-items"],
    queryFn: async () => {
      const response = await apiClient.get("api/item");
      return response.data;
    },
  });

  if (isLoading || isFetching) return <FullScreenLoading />;

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Marketplace</h1>
      <div className="grid grid-cols-[1fr_auto]">
        <div className="max-w-screen-md">
          {data.results.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
        <div>
          <CreateItem />
        </div>
      </div>
    </div>
  );
};
export default Marketplace;

const items = [
  {
    user: "aaa",
    name: "Hello Kitty plushie",
    description: "Hello kitty Plushie soft 2x2m size",
    price: "1000tg",
    category: "Items",
    image_url: "#",
    created_date: new Date().toDateString(),
  },
];
