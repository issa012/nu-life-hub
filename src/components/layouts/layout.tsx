import { Navigate, Outlet } from "react-router-dom";
import { Home, Package, ShoppingCart, Users } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";

import FullScreenLoading from "../fullscreen-loading";
import Header from "./header";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  const { user } = useAuth();
  const { data, isLoading, isFetching } = useUser();
  console.log(data);
  if (isLoading || isFetching) {
    return <FullScreenLoading />;
  }
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
        <Toaster />
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

export type NavItems = typeof navItems;
