import { RouteObject } from "react-router-dom";
import { CategoriesScreen, ContentPost, ContentScreen, HomeScreen, LoginScreen, RegisterScreen, TopicsScreen } from "./pages";

export type RouteConfig = RouteObject & {
  title?: string;
  // children?: Array<RouteConfig>;
};

const authRoutes: RouteConfig[] = [
  {
    index: true,
    path: "login",
    title: "Login",
    element: <LoginScreen />,
  },
  {
    path: "register",
    title: "Register",
    element: <RegisterScreen />,
  }
];


const mainRoutes: RouteConfig[] = [
  {
    index: true,
    element: <HomeScreen />
  },
  {
    path: "content",
    title: "Content",
    element: <ContentScreen />,
  },
  {
    path: "content/:id",
    element: <ContentPost />
  },
  {
    path: "topics",
    title: "Topics",
    element: <TopicsScreen />,
  },
  {
    path: "categories",
    title: "Categories",
    element: <CategoriesScreen />,
  }

];

export {
  authRoutes,
  mainRoutes
};

