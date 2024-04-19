import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./context/auth-provider";
import Layout from "@/components/layouts/layout";
import Homepage from "@/pages/Homepage/homepage";
import AuthPage from "@/pages/Auth";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import JobBoard from "./pages/JobBoard";
import UserProfileLayout from "./components/layouts/userProfileLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id="root" path="/">
      <Route element={<Layout />}>
        <Route index={true} element={<Homepage />} />
        <Route path="events" element={<Events />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="jobs" element={<JobBoard />} />
        <Route path="user/:id" element={<UserProfileLayout />} errorElement={<h1>NOT FOUND</h1>}>
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
