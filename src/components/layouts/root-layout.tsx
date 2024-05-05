import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
      <ScrollRestoration />
    </>
  );
}
