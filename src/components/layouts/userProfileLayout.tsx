import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const UserProfileLayout = () => {
  return (
    <>
      <div>
        <ul className="flex gap-10 text-primary-foreground text-3xl font-light tracking-tight transition-colors">
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                cn("pb-2 border-0 border-primary hover:border-b-4", isActive && "border-b-4")
              }
            >
              Profile Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="posts"
              className={({ isActive }) =>
                cn("pb-2 border-primary hover:border-b-4", isActive && "border-b-4")
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
