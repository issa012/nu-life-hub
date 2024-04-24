import EventItem from "./event-item";
import { Calendar } from "@/components/ui/calendar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import FullScreenLoading from "@/components/fullscreen-loading";
import { CreateEvent } from "./create-event";

import { ScrollRestoration, useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/custom-pagination";
import Searchbar from "@/components/searchbar";
import { authApi } from "@/authApi";

const Events = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const fetchEvents = async (page: number) => {
    const response = await authApi.get(`api/event/?page=${page}`);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["event-items", currentPage],
    queryFn: () => fetchEvents(currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div>
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Events</h1>
          <div>
            <Calendar />
          </div>
        </div>
        <div className="container space-y-4">
          <div className="flex justify-between items-center">
            <Searchbar />
            <CreateEvent />
          </div>
          {!isLoading ? (
            <>
              <div className="flex flex-row flex-wrap">
                {data.results.map((event) => (
                  <EventItem event={event} key={event.id} />
                ))}
              </div>
              <CustomPagination currentPage={currentPage} count={Math.ceil(data.count / 10)} />{" "}
            </>
          ) : (
            <FullScreenLoading />
          )}
        </div>
        <ScrollRestoration />
      </div>
    </div>
  );
};
export default Events;
