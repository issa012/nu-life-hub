import FullScreenLoading from "@/components/fullscreen-loading";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import CategorySelect from "../../components/select-category";
import { fetchEventCategories } from "./event-service";
import { fetchAllClubs } from "../clubs/club-service";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const EventFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category_id") || "";
  const selectedClub = searchParams.get("club_id") || "";
  const dateString = searchParams.get("date");
  const currentDate: Date | undefined = dateString ? new Date(dateString) : undefined;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: () => fetchEventCategories(),
  });

  const { data: clubs, isLoading: clubsLoading } = useQuery({
    queryKey: ["club-list"],
    queryFn: () => fetchAllClubs(),
  });

  if (categoriesLoading || clubsLoading) return <FullScreenLoading />;

  return (
    <div className="space-y-4">
      <Calendar
        defaultMonth={currentDate}
        mode="single"
        selected={selectedDate}
        onSelect={(value) => {
          setSelectedDate(value);
          setSearchParams((prev) => {
            if (!value) prev.delete("date");
            else
              prev.set("date", `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`);
            prev.delete("page"); // remove page so that page 1 is default
            return prev;
          });
        }}
      />
      <div className="space-y-2">
        <CategorySelect
          categories={categories}
          value={selectedCategory}
          placeholder="Select a category"
          label="Category"
          onValueChange={(value) => {
            setSearchParams((prev) => {
              prev.delete("page"); // remove page so that page 1 is default
              prev.set("category_id", value);
              if (value == "all") prev.delete("category_id");
              return prev;
            });
          }}
        />
        <CategorySelect
          categories={clubs.results}
          value={selectedClub}
          placeholder="Select a club"
          label="Clubs"
          onValueChange={(value) => {
            setSearchParams((prev) => {
              prev.delete("page"); // remove page so that page 1 is default
              prev.set("club_id", value);
              if (value == "all") prev.delete("club_id");
              return prev;
            });
          }}
        />
      </div>
    </div>
  );
};
export default EventFilters;
