import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTruncatedElement } from "@/hooks/useTruncatedElement";

const JobCard = ({ job }: { job: IJob }) => {
  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({ ref });

  return (
    <Link key={job.id} to="#">
      <Card className="hover:shadow-md">
        <CardHeader>
          <CardTitle>{job.name}</CardTitle>
          <CardDescription>
            <span>Date: {job.created_date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "w-full resize-none bg-inherit whitespace-pre-wrap line-clamp-4 transition-all",
              isShowingMore && "line-clamp-none"
            )}
            ref={ref}
          >
            {job.description}
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
        </CardContent>
      </Card>
    </Link>
  );
};
export default JobCard;

export interface IJob {
  id: number;
  name: string;
  description: string;
  created_date: string;
}
