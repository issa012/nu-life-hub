import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const JobCard = ({ job }: { job: IJob }) => {
  return (
    <Link key={job.id} to="#">
      <Card className="hover:bg-muted">
        <CardHeader>
          <CardTitle>{job.name}</CardTitle>
          <CardDescription>
            <span>Date: {job.created_date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea readOnly={true} className="w-full resize-none bg-inherit" rows={8}>
            {job.description}
          </Textarea>
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
