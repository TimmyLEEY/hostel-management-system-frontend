import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-lightBg flex flex-col">

      {/* ✅ TOP NAVBAR (your Sidebar is now top nav) */}
      <Sidebar role="STUDENT" />

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-16 sm:pt-20 px-4 sm:px-6">
        <Outlet />
      </main>

    </div>
  );
}