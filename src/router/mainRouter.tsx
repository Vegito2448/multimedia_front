import {
  createBrowserRouter,
  Navigate,
  RouteObject
} from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from "./PublicRoute";
import { authRoutes, mainRoutes } from "./routesConfig";

export const mainPath = import.meta.env.DEV ? "/" : "/multimedia_front/";

export const allRoutes: RouteObject[] = [
  {
    path: `/auth/`,
    element: <PublicRoute children={<AuthLayout />} />,
    children: authRoutes
  },
  {
    path: `/`,
    element: <PrivateRoute children={<MainLayout />} />,
    children: mainRoutes
  },
  {
    path: "*",
    element: <Navigate
      to={`/auth/login/`}
      replace
    />

  }
];

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(allRoutes);

