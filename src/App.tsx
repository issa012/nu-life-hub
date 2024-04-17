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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route id="root" path="/">
      <Route element={<Layout />}>
        <Route index={true} element={<Homepage />} />
        <Route path="events" />
        <Route path="marketplace" />
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
