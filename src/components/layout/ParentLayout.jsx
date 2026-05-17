// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function ParentLayout() {
//   return (
//     <div className="flex min-h-screen bg-blue-50">
//       <Sidebar role="PARENT" />
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function ParentLayout() {
  return (
    <div className="min-h-screen bg-lightBg flex">
      {/* Sidebar */}
      <Sidebar role="PARENT" />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow-soft flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-700">
            Parent Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-xs font-semibold bg-secondary/10 text-secondary rounded-full">
              PARENT
            </span>

            <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
              P
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
