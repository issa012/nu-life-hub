import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Status from "../status";
import logo from "../../assets/nhl-logo.svg";
import { cn } from "@/lib/utils";
import { NavItems } from "./layout";

const Header = ({ navItems }: { navItems: NavItems }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
              <img src={logo} className="" />
              <span>NU Life Hub</span>
            </Link>
            {navItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.text}
                className={({ isActive }) =>
                  cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    isActive && "text-secondary-foreground"
                  )
                }
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src={logo} className="" />
          <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary">
            NU Life Hub
          </span>
        </Link>
      </div>

      <div className="w-full flex-1 ">
        <nav className="items-start text-base hidden md:flex gap-10">
          {navItems.map((item) => (
            <NavLink
              to={item.href}
              key={item.text}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-2 text-muted-foreground py-2 transition-all hover:text-primary",
                  isActive && "text-primary border-primary"
                )
              }
            >
              {item.icon}
              {item.text}
            </NavLink>
          ))}
        </nav>
      </div>
      <Status />
    </header>
  );
};
export default Header;
