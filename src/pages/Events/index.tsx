import { useEffect, useState } from "react";
import EventItem, { IEvent } from "./event-item";
import { Calendar } from "@/components/ui/calendar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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

import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/custom-pagination";

const Events = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const apiClient = useAxiosPrivate();
  const [category, setCategory] = useState();
  const { data: filters, isLoading: filtersLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: async () => {
      const res = await apiClient.get("api/event/get_event_categories");
      return res.data;
    },
  });

  const fetchEvents = async (page: number) => {
    const response = await apiClient.get(`api/event/?page=${page}`);
    return response.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["event-items", currentPage],
    queryFn: () => fetchEvents(currentPage),
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  if (isLoading || isFetching || filtersLoading) return <FullScreenLoading />;

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Events</h1>
      <div className="grid gap-7">
        <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5">
          {/* <div>
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
          </div> */}
          <div className="flex flex-row flex-wrap">
            {data.results.map((event) => (
              <EventItem event={event} key={event.id} />
            ))}
          </div>
          <CustomPagination currentPage={currentPage} count={Math.ceil(data.count / 10)} />
        </div>
      </div>
    </div>
  );
};
export default Events;
