import FullScreenLoading from "@/components/fullscreen-loading";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./job-card";

const JobBoard = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const res = await axiosPrivate.get("api/vacancy");
      return res.data;
    },
  });
  if (isLoading && isFetching) return <FullScreenLoading />;

  return (
    <div>
      <div>JobBoard</div>
      <div className="grid gap-4">
        {data.results.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};
export default JobBoard;
