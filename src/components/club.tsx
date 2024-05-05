import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

const Club = ({ id, name, image_url }: { id: number; name: string; image_url: string }) => {
  return (
    <Link to={`/club/${id}`}>
      <div className="inline-flex items-center justify-center gap-2 rounded-sm">
        <Avatar>
          <AvatarImage src={image_url} />
        </Avatar>
        <div>
          <span className="text-lg">{name}</span>
        </div>
      </div>
    </Link>
  );
};
export default Club;
