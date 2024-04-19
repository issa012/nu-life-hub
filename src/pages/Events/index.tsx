import EventItem, { IEvent } from "./event-item";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateEvent } from "./create-event";

const Events = () => {
  const apiClient = useAxiosPrivate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["event-items"],
    queryFn: async () => {
      const response = await apiClient.get("api/event");
      return response.data;
    },
  });

  if (isLoading || isFetching) return <FullScreenLoading />;
  console.log(data);

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Events</h1>
      <div className="grid grid-cols-[1fr_auto] gap-7">
        <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5">
          {data.results.map((event) => (
            <EventItem event={event} />
          ))}
        </div>
        <div className="">
          <Calendar />
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};
export default Events;
