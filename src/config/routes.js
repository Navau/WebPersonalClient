import React from "react";

// Layouts
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin Pages
import Admin from "../pages/Admin";
import SignIn from "../pages/Admin/SignIn";
import Users from "../pages/Admin/Users";
import MenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses";
import AdminBlog from "../pages/Admin/Blog";

//Basic Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Blog from "../pages/Blog";

//ERROR404
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin/*",
    element: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/",
        element: Admin,
        exact: true,
      },
      {
        path: "/login",
        element: SignIn,
        exact: true,
      },
      {
        path: "/users",
        element: Users,
        exact: true,
      },
      {
        path: "/menu",
        element: MenuWeb,
        exact: true,
      },
      {
        path: "/cursos",
        element: AdminCourses,
        exact: true,
      },
      {
        path: "/blog",
        element: AdminBlog,
        exact: true,
      },
      {
        path: "*",
        element: Error404,
        exact: true,
      },
    ],
  },
  {
    path: "/*",
    element: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        element: Home,
        exact: true,
      },
      {
        path: "/contact",
        element: Contact,
        exact: true,
      },
      {
        path: "/cursos",
        element: Courses,
        exact: true,
      },
      {
        path: "/blog",
        element: Blog,
        exact: true,
      },
      {
        path: "/blog/:url",
        element: Blog,
        exact: true,
      },
      {
        path: "*",
        element: Error404,
        exact: true,
      },
    ],
  },
];

export default routes;
