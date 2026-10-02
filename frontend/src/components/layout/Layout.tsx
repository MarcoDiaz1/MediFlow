import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#212529]">
      <Sidebar />
      <main className="flex-1 flex flex-col p-[2vw] pl-0 items-center justify-center">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;