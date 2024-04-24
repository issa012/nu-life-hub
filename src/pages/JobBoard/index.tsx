import FullScreenLoading from "@/components/fullscreen-loading";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import JobCard from "./job-card";

import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/custom-pagination";

const JobBoard = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const axiosPrivate = useAxiosPrivate();

  const fetchJobs = async (page: number) => {
    const res = await axiosPrivate.get(`api/vacancy/?page=${page}`);
    return res.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vacancies", currentPage],
    queryFn: () => fetchJobs(currentPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading || isFetching) return <FullScreenLoading />;

  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">JobBoard</h1>
      <div className="grid gap-4">
        {data.results.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
      <CustomPagination currentPage={currentPage} count={Math.ceil(data.count / 10)} />
    </div>
  );
};
export default JobBoard;
