import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/nhl-logo.svg";
import { cn } from "@/lib/utils";
import { NavItems } from "./layout";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/authApi";

const Sidebar = ({ navItems }: { navItems: NavItems }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await authApi.get("api/club");
      return res.data;
    },
  });

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

          {!isLoading && (
            <div className="grid gap-2 px-2 text-base lg:px-4 pt-4">
              <div className="text-xl">Club list</div>
              {data.results.map((club) => (
                <div className="px-4 pt-2 text-muted-foreground hover:text-primary" key={club.id}>
                  {club.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
