import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/nhl-logo.svg";
import { cn } from "@/lib/utils";
import { NavItems } from "./layout";

const Sidebar = ({ navItems }: { navItems: NavItems }) => {
  return (
    <div className="hidden bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={logo} className="" />
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary">
              NU Life Hub
            </span>
          </Link>
        </div>
        <div className="flex-1 border-r">
          <nav className="grid items-start px-2 text-base lg:px-4 pt-4">
            {navItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.text}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2 transition-all hover:bg-primary/15 hover:border-primary",
                    isActive && "bg-primary/15"
                  )
                }
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
