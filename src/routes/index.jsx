import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home/"));
const Vehicle = lazy(() => import("@/pages/vehicle"));
const DetailVehicle = lazy(() => import("@/pages/vehicle/detail"));
const Layout = lazy(() => import("@/container/MainLayout"));
const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/components/molecules/NotFound"));
const SearchVehicleHistory = lazy(() => import("@/pages/vehicle/search"));

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
        path: "/vehicle",
        element: <Vehicle />,
        children: [
          {
            path: "detail/:id",
            element: <DetailVehicle />
          },
        ],
      },
      {
        path: "/vehicle/search",
        element: <SearchVehicleHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
