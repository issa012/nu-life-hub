import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchJobs } from "./job-service";

import CustomPagination from "@/components/custom-pagination";
import FullScreenLoading from "@/components/fullscreen-loading";
import JobCard from "./job-card";
import Searchbar from "@/components/searchbar";
import JobFilters from "./filters";
import { CreateVacancy } from "./create";

const JobBoard = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedCategory = Number(searchParams.get("category_id"));
  const searchTerm = searchParams.get("search");

  const { data, isLoading } = useQuery({
    queryKey: ["vacancies", currentPage, selectedCategory, searchTerm],
    queryFn: () => fetchJobs(currentPage, selectedCategory, searchTerm),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="grid grid-cols-[300px_1fr]">
      <div className="space-y-6">
        <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Job Board</h1>
        <JobFilters />
      </div>
      <div className="container space-y-4 ">
        <div className="flex justify-between">
          <Searchbar />
          <CreateVacancy />
        </div>
        {!isLoading ? (
          data?.count ? (
            <div className="grid gap-4">
              {data.results.map((job) => (
                <JobCard job={job} key={job.id} />
              ))}
              <CustomPagination currentPage={currentPage} count={data.count} />
            </div>
          ) : (
            <div>There are no jobs available</div>
          )
        ) : (
          <FullScreenLoading />
        )}
      </div>
    </div>
  );
};
export default JobBoard;
