import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { Input } from "../ui/input";
import Status from "../status";
import logo from "../../assets/nhl-logo.svg";
import { NavItems } from "./layout";
import { cn } from "@/lib/utils";
import Searchbar from "../searchbar";

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
      <Searchbar />
      <Status />
    </header>
  );
};
export default Header;
