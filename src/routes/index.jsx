import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("@/container/MainLayout"));
const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/components/molecules/NotFound"));

// Pages
const Home = lazy(() => import("@/pages/home/"));
const Order = lazy(() => import("@/pages/order/"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/orders",
        element: <Order />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
