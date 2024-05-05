import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchItem } from "./item-service";
import FullScreenLoading from "@/components/fullscreen-loading";
import User from "@/components/user";

export default function ItemPage() {
  let { id } = useParams<{ id: string }>();

  const { data: item, isLoading } = useQuery({
    queryKey: [`item_${id}`],
    queryFn: () => fetchItem(id || ""),
  });
  if (isLoading) return <FullScreenLoading />;

  return (
    <div className="container">
      <div className="grid grid-cols-[350px_1fr] gap-8 border bg-muted p-8 rounded">
        <div className="w-full h-full rounded">
          <img src={item?.image_url} className="size-full object-cover rounded bg-muted" />
        </div>
        <div className="">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{item?.name}</h3>
          <User {...item?.user} />
          <div className="">{item?.price} tenge</div>
          <p className="whitespace-pre-wrap">{item?.description}</p>
        </div>
      </div>
    </div>
  );
}
