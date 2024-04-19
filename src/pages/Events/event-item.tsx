import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EventItem = ({ event }: { event: IEvent }) => {
  return (
    <Link key={event.id} to="#">
      <Card className="hover:bg-muted">
        <CardHeader>
          <CardTitle>
            <div>
              <span>{event.name}</span>
              <span className="pl-4 text-muted-foreground text-xl">By {event.club}</span>
            </div>
          </CardTitle>
          <CardDescription>
            <span>Date: {event.date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <img src={event.image_url} />
          </div>
          <textarea readOnly={true} className="w-full">
            {event.description}
          </textarea>
        </CardContent>
      </Card>
    </Link>
  );
};
export default EventItem;

export interface IEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  image_url: string;
  club: string;
  clubIconUrl: string;
}
