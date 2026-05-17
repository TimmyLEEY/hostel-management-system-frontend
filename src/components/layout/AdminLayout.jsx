import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-lightBg flex flex-col">

      {/* ✅ TOP NAVBAR */}
      <Sidebar role="ADMIN" />

      {/* ✅ PAGE CONTENT */}
      <main className="flex-1 pt-16 sm:pt-20 px-4 sm:px-6">

        {/* Header Section */}
        <div className="h-14 sm:h-16 bg-white shadow-soft rounded-xl flex items-center justify-between px-4 sm:px-6 mb-6">

          <h1 className="text-sm sm:text-lg font-semibold text-gray-700">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3 sm:gap-4">

            <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary rounded-full">
              ADMIN
            </span>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
              A
            </div>

          </div>
        </div>

        {/* Nested Pages */}
        <Outlet />

      </main>
    </div>
  );
}