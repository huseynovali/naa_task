import { createBrowserRouter } from "react-router";
import AdminPanel from "../page/AdminPanel";
import Post from "../components/AdminPanel/Post";

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
]);

export default router;
