import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedPage } from "./pages/Protected/protected";
import { Layout } from "./components/layouts/layout";
import Homepage from "./pages/Homepage/homepage";
import AuthPage from "./pages/Auth";
import AuthProvider from "./context/auth-provider";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Homepage /> },
          { path: "protected", element: <ProtectedPage /> },
        ],
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </AuthProvider>
  );
}
