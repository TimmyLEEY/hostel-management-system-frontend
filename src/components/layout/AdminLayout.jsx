import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex">

      {/* SIDEBAR */}
      <Sidebar role="ADMIN" />

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col">

        {/* TOP BAR */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0f1c]/80 backdrop-blur-xl">

          <div className="flex h-16 items-center justify-between px-6">

            {/* LEFT */}
            <div>
              <h1 className="text-sm font-medium text-white">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-400">
                Hostel Management System
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                ADMIN
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-bold text-white">
                A
              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 bg-[#0a0f1c] px-6 py-6">

          <Outlet />

        </main>

      </div>
    </div>
  );
}