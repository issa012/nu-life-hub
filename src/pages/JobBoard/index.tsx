import FullScreenLoading from "@/components/fullscreen-loading";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./job-card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollRestoration, useSearchParams } from "react-router-dom";

const JobBoard = () => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const axiosPrivate = useAxiosPrivate();

  const fetchJobs = async (page: number | string) => {
    const res = await axiosPrivate.get(`api/vacancy/?page=${page}`);
    return res.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vacancies", currentPage],
    queryFn: () => fetchJobs(currentPage),
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious to={`?page=${+currentPage - 1}`} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=2">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="?page=3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext to={`?page=${+currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ScrollRestoration />
    </div>
  );
};
export default JobBoard;
