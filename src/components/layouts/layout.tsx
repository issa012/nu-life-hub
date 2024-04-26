import { Navigate, Outlet } from "react-router-dom";
import { Home, Package, ShoppingCart, Users } from "lucide-react";
import Header from "./header";
import { useAuth } from "@/hooks/useAuth";

export default function Layout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen w-full">
      {/* <Sidebar navItems={navItems} /> */}
      <div className="flex flex-col">
        <Header navItems={navItems} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const navItems = [
  { icon: <Home />, text: "Home", href: "/" },
  { icon: <Package />, text: "Events", href: "events" },
  { icon: <ShoppingCart />, text: "Marketplace", href: "marketplace" },
  { icon: <Users />, text: "Jobs", href: "jobs" },
];

export type NavItems = typeof navItems;
