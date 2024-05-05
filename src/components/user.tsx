import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CircleUser } from "lucide-react";

const User = ({
  id,
  username,
  avatar_url,
  telegram_url,
}: {
  id: number;
  username: string;
  avatar_url: string;
  telegram_url: string;
}) => {
  return (
    <Link to={`/users/${id}`}>
      <div className="inline-flex items-center justify-center gap-2 rounded-sm">
        <Avatar>
          <AvatarImage src={avatar_url} />
          <AvatarFallback>
            <CircleUser className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-sm">{username}</span>
          <span className="text-xs text-muted-foreground">{telegram_url}</span>
        </div>
      </div>
    </Link>
  );
};
export default User;
