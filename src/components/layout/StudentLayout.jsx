import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 flex flex-col">

      {/* TOP NAV / SIDEBAR */}
      <Sidebar role="STUDENT" />

      {/* PAGE AREA */}
      <main className="flex-1 pt-16 sm:pt-20 px-4 sm:px-6">

        {/* subtle background glow for depth */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        {/* content sits above glow */}
        <div className="relative z-10">
          <Outlet />
        </div>

      </main>
    </div>
  );
}