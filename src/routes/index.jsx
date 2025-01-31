import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("@/container/MainLayout"));
const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/components/molecules/NotFound"));

// Pages
const Home = lazy(() => import("@/pages/home/"));
const Order = lazy(() => import("@/pages/order/"));
const Product = lazy(() => import("@/pages/product"));
const Customer = lazy(() => import("@/pages/customer"));
const Analytic = lazy(() => import("@/pages/analytic"));
const User = lazy(() => import("@/pages/user"));

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
			{
				path: "/products",
				element: <Product />,
			},
			{
				path: "/customers",
				element: <Customer />,
			},
			{
				path: "/analytics",
				element: <Analytic />,
			},
			{
				path: "/users",
				element: <User />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
]);
