import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const UserProfileLayout = () => {
  return (
    <>
      <div>
        <ul className="flex gap-10 text-primary-foreground text-3xl font-extralight tracking-tight transition-colors">
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                cn("pb-2 border-0 border-primary hover:text-primary", isActive && "border-b-4")
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="posts"
              className={({ isActive }) =>
                cn("pb-2 border-primary hover:text-primary", isActive && "border-b-4")
              }
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};
export default UserProfileLayout;
