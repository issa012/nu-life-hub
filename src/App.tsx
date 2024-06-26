import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./context/auth-provider";
import RootLayout from "./components/layouts/root-layout";
import UserProfileLayout from "./components/layouts/userProfileLayout";
import Layout from "@/components/layouts/layout";
import Homepage from "@/pages/home/homepage";
import UserProfile from "./pages/profile";
import AuthPage from "@/pages/authentification";
import Events from "./pages/events";
import Marketplace from "./pages/items";
import JobBoard from "./pages/vacancies";
import ItemPage from "./pages/items/item-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id="root" path="/" element={<RootLayout />}>
      <Route element={<Layout />}>
        <Route index={true} element={<Homepage />} />
        <Route path="events" element={<Events />} />
        <Route path="marketplace">
          <Route index={true} element={<Marketplace />} />
          <Route path=":id" element={<ItemPage />} />
        </Route>
        <Route path="jobs" element={<JobBoard />} />
        <Route path="user/:id" element={<UserProfileLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="posts" />
        </Route>
      </Route>
      <Route path="auth" element={<AuthPage />} />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
