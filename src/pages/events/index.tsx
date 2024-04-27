import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import FullScreenLoading from "@/components/fullscreen-loading";
import CustomPagination from "@/components/custom-pagination";
import Searchbar from "@/components/searchbar";
import EventFilters from "./filters";
import { fetchEvents } from "./event-service";
import { CreateEvent } from "./create-event";
import EventItem from "./event-card";

const Events = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedCategory = Number(searchParams.get("category_id"));
  const selectedClub = Number(searchParams.get("club_id"));
  const searchTerm = searchParams.get("search");
  const selectedDate = searchParams.get("date");

  const { data, isLoading } = useQuery({
    queryKey: [
      "event-items",
      currentPage,
      selectedCategory,
      selectedClub,
      searchTerm,
      selectedDate,
    ],
    queryFn: () =>
      fetchEvents(currentPage, selectedCategory, selectedClub, searchTerm, selectedDate),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Events</h1>

          <EventFilters />
        </div>
        <div className="container space-y-4">
          <div className="flex justify-between items-center">
            <Searchbar />
            <CreateEvent />
          </div>
          {!isLoading ? (
            data?.count ? (
              <>
                <div className="flex flex-row flex-wrap">
                  {data.results.map((event) => (
                    <EventItem event={event} key={event.id} />
                  ))}
                </div>
                <CustomPagination currentPage={currentPage} count={data.count} perPage={12} />
              </>
            ) : (
              <div>There are no events to display</div>
            )
          ) : (
            <FullScreenLoading />
          )}
        </div>
      </div>
    </div>
  );
};
export default Events;
