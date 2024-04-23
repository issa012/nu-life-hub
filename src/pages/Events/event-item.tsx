import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EventItem = ({ event }: { event: IEvent }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3 relative">
      <div className="h-full relative overflow-hidden rounded-lg">
        <Link to={`${event.id}`}>
          <img
            src={event.image_url}
            className="w-full h-full overflow-hidden object-contain bg-muted rounded-lg"
          />
          <div className="absolute top-0 bottom-0 right-0 left-0 rounded-lg overflow-scroll translate-y-10  hover:translate-y-0 opacity-0 hover:opacity-100 p-8 text-white transition-all bg-gradient-to-t from-neutral-950 via-black/60 to-neutral-950">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{event.name}</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        </Link>
      </div>
    </div>
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
