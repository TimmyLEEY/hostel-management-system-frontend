import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/ChatGPT Image May 17, 2026, 10_04_15 PM.png";
import { logout } from "../../services/auth";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = {
    ADMIN: [
      { name: "Dashboard", path: "/admin" },
      { name: "Students", path: "/admin/students" },
      { name: "Rooms", path: "/admin/rooms" },
      { name: "Complaints", path: "/admin/complaints" },
      { name: "Permissions", path: "/admin/permissions" },
      { name: "Notices", path: "/admin/notices" },
      { name: "Contact Details", path: "/admin/contacts" },
    ],
    STUDENT: [
      { name: "Dashboard", path: "/student" },
      { name: "Complaints", path: "/student/complaints" },
      { name: "Outing Request", path: "/student/permissions" },
      { name: "Notices", path: "/student/notices" },
      { name: "Contact Details", path: "/student/contacts" },
      { name: "Profile", path: "/student/profile" },
    ],
    PARENT: [
      { name: "Dashboard", path: "/parent" },
      { name: "Outing Requests", path: "/parent/permissions" },
      { name: "Notices", path: "/parent/notices" },
      { name: "Contact Details", path: "/parent/contacts" },
    ],
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4 z-50">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10" />
          <div className="leading-tight">
            {/* <p className="text-sm font-semibold text-gray-700">
              Geethanjali Institute
            </p>
            <p className="text-xs text-gray-500">
              Hostel Management
            </p> */}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {menu[role]?.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded-md text-sm bg-red-50 text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 md:hidden">

          <div className="flex flex-col p-4 gap-2">

            {menu[role]?.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="mt-2 px-3 py-2 rounded-md text-sm bg-red-50 text-red-600"
            >
              Logout
            </button>

          </div>
        </div>
      )}
    </>
  );
}