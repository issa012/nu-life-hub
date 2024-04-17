import { CircleUser, Home, Menu, Package, Search, ShoppingCart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/nhl-logo.svg";
import { cn } from "@/lib/utils";

export function Layout() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[272px_1fr] lg:grid-cols-[280px_1fr]">
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
                <Link
                  to={item.href}
                  key={item.text}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2 transition-all hover:bg-primary/15 hover:border-primary",
                    location.pathname == item.href && "bg-primary/15"
                  )}
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
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
                  <Link
                    to={item.href}
                    key={item.text}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground "
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
const navItems = [
  { icon: <Home />, text: "Home", href: "/" },
  { icon: <ShoppingCart />, text: "Marketplace", href: "marketplace" },
  { icon: <Package />, text: "Events", href: "events" },
  { icon: <Users />, text: "Jobs", href: "jobs" },
];
