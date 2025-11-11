import { createBrowserRouter } from "react-router";
import AdminPanel from "../page/AdminPanel";

const router = createBrowserRouter([
  {
    path: "",
    element: <AdminPanel />,
  },
]);

export default router;
