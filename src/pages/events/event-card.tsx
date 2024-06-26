import Club from "@/components/club";
import { IEvent } from "@/types";
import { Link } from "react-router-dom";

const EventItem = ({ event }: { event: IEvent }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3 relative">
      <div className="h-full relative overflow-hidden rounded-lg">
        <div className="relative rounded-lg overflow-hidden h-full flex justify-center before:block before:content=[''] before:pt-[133%] bg-muted">
          <Link to={`${event.id}`}>
            <img
              src={event.image_url}
              className="w-full h-full overflow-hidden object-contain rounded-lg"
            />
            <div className="absolute flex flex-col items-start justify-between top-0 bottom-0 right-0 left-0 rounded-lg overflow-scroll translate-y-10  hover:translate-y-0 opacity-0 hover:opacity-100 p-4 text-white transition-all bg-gradient-to-t from-neutral-950 via-white/0 to-neutral-950">
              <Club {...event.club} />
              <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">{event.name}</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EventItem;
