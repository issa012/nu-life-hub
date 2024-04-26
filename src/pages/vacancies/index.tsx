import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchJobs } from "./job-service";

import CustomPagination from "@/components/custom-pagination";
import FullScreenLoading from "@/components/fullscreen-loading";
import JobCard from "./job-card";

const JobBoard = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["vacancies", currentPage],
    queryFn: () => fetchJobs(currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">JobBoard</h1>
      <div className="grid gap-4">
        {!isLoading ? (
          data?.results ? (
            <div>
              {data.results.map((job) => (
                <JobCard job={job} key={job.id} />
              ))}
              <CustomPagination currentPage={currentPage} count={data.count} perPage={10} />
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
