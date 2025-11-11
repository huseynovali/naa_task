import Sidebar from "./Sidebar";

import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#FEFEFE] p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
