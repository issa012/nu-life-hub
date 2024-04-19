import EventItem, { IEvent } from "./event-item";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateEvent } from "./create-event";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Events = () => {
  const apiClient = useAxiosPrivate();
  const [category, setCategory] = useState();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["event-items"],
    queryFn: async () => {
      const response = await apiClient.get("api/event");
      return response.data;
    },
  });

  const { data: filters, isLoading: filtersLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: async () => {
      const res = await apiClient.get("api/event/get_event_categories");
      return res.data;
    },
  });

  if (isLoading || isFetching || filtersLoading) return <FullScreenLoading />;
  console.log(data);

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Events</h1>
      <div className="grid grid-cols-[1fr_auto] gap-7">
        <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5">
          <div>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a catgeory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {filters.map((filter) => (
                    <SelectItem value={filter.id} key={filter.id}>
                      {filter.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            {data.results
              .filter((event) => {
                if (category) return event.category == category;
                return true;
              })
              .map((event) => (
                <EventItem event={event} key={event.id} />
              ))}
          </div>
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
