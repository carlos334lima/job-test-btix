import { createBrowserRouter } from "react-router-dom";

import PostsList from "../pages/PostsList";
import UsersList from "../pages/UsersList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsList />,
  },
  {
    path: "/users",
    element: <UsersList />,
  },
]);
