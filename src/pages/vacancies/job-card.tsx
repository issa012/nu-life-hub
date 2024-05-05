import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTruncatedElement } from "@/hooks/useTruncatedElement";
import { IJob } from "@/types";
import User from "@/components/user";

const JobDescription = ({ description }: { description: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({ ref });

  return (
    <>
      <div
        className={cn(
          "w-full resize-none bg-inherit whitespace-pre-wrap line-clamp-4 transition-all",
          isShowingMore && "line-clamp-none"
        )}
        ref={ref}
      >
        {description}
      </div>
      {isTruncated && (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={toggleIsShowingMore}
            className="hover:underline hover:bg-inherit"
          >
            {isShowingMore ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </>
  );
};

const JobCard = ({ job }: { job: IJob }) => {
  console.log(job);
  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <CardTitle>{job.name}</CardTitle>
        <CardDescription>
          <div>Date: {job.created_date}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <User {...job.user} />

        <JobDescription description={job.description} />
      </CardContent>
    </Card>
  );
};
export default JobCard;
