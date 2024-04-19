import FullScreenLoading from "@/components/fullscreen-loading";
import { Calendar } from "@/components/ui/calendar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import EventItem from "../Events/event-item";

const Homepage = () => {
  const apiClient = useAxiosPrivate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["event-items"],
    queryFn: async () => {
      const response = await apiClient.get("api/event");
      return response.data;
    },
  });

  if (isLoading || isFetching) return <FullScreenLoading />;
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Homepage</h1>
      <div className="grid grid-cols-[1fr_auto] gap-7">
        <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5"></div>
        <div className="grid grid-cols-[1fr_auto] gap-7">
          <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5">
            {data.results.map((event) => (
              <EventItem event={event} />
            ))}
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default Homepage;
