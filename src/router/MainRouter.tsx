import { createBrowserRouter } from "react-router";
import AdminPanel from "../page/AdminPanel";
import Post from "../components/AdminPanel/Post";
import Page404 from "../page/Page404";

const router = createBrowserRouter([
  {
    path: "",
    element: <AdminPanel />,
    children: [
      {
        path: "/post",
        element: <Post />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  }
]);

export default router;
