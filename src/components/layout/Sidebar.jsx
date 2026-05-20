

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  Users,
  BedDouble,
  Bell,
  ShieldCheck,
  FileWarning,
  Phone,
  UserCircle2,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import logo from "../../assets/24f27772-f206-492d-8428-60a347a88aee.jpeg";
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
      {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        name: "Students",
        path: "/admin/students",
        icon: Users,
      },
      {
        name: "Rooms",
        path: "/admin/rooms",
        icon: BedDouble,
      },
      {
        name: "Complaints",
        path: "/admin/complaints",
        icon: FileWarning,
      },
      {
        name: "Permissions",
        path: "/admin/permissions",
        icon: ShieldCheck,
      },
      {
        name: "Notices",
        path: "/admin/notices",
        icon: Bell,
      },
      {
        name: "Contacts",
        path: "/admin/contacts",
        icon: Phone,
      },
    ],

    STUDENT: [
      {
        name: "Dashboard",
        path: "/student",
        icon: LayoutDashboard,
      },
      {
        name: "Complaints",
        path: "/student/complaints",
        icon: FileWarning,
      },
      {
        name: "Outing",
        path: "/student/permissions",
        icon: ShieldCheck,
      },
      {
        name: "Notices",
        path: "/student/notices",
        icon: Bell,
      },
      {
        name: "Contacts",
        path: "/student/contacts",
        icon: Phone,
      },
      {
        name: "Profile",
        path: "/student/profile",
        icon: UserCircle2,
      },
    ],

    PARENT: [
      {
        name: "Dashboard",
        path: "/parent",
        icon: LayoutDashboard,
      },
      {
        name: "Outing Requests",
        path: "/parent/permissions",
        icon: ShieldCheck,
      },
      {
        name: "Notices",
        path: "/parent/notices",
        icon: Bell,
      },
      {
        name: "Contacts",
        path: "/parent/contacts",
        icon: Phone,
      },
    ],
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#030712]/80 backdrop-blur-2xl">
        <div className="flex h-20 items-center justify-between px-4 md:px-8">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/30 blur-xl" />

                <img
                  src={logo}
                  alt="Logo"
                  className="relative h-12 w-12 rounded-2xl border border-white/10 object-cover"
                />
              </div>

              <div className="hidden sm:block">
                {/* <h1 className="text-sm font-semibold tracking-wide text-white">
                  SITERYX HMS
                </h1>

                <p className="text-xs text-gray-400">
                  Premium Hostel System
                </p> */}
              </div>
            </div>

            {/* ROLE BADGE */}
            <div className="hidden md:flex">
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
                {role} PANEL
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-2 lg:flex">
            {menu[role]?.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg shadow-cyan-500/10"
                        : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={17}
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "text-cyan-400"
                            : "group-hover:scale-110"
                        }`}
                      />

                      {item.name}

                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 -z-10 rounded-2xl border border-white/10 bg-white/[0.04]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20 md:flex"
            >
              <LogOut size={16} />
              Logout
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition-all hover:bg-white/[0.08] lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* MOBILE DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="fixed right-0 top-0 z-50 h-screen w-[85%] max-w-sm border-l border-white/10 bg-[#030712]/95 p-6 backdrop-blur-2xl lg:hidden"
            >
              {/* TOP */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-11 w-11 rounded-2xl"
                  />

                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      SITERYX HMS
                    </h2>

                    <p className="text-xs text-gray-400">
                      {role} Workspace
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-white/10 p-2 text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* NAV ITEMS */}
              <div className="space-y-2">
                {menu[role]?.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} />

                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>

                        <ChevronRight
                          size={16}
                          className="opacity-40 transition-transform group-hover:translate-x-1"
                        />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* FOOTER */}
              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={handleLogout}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-red-500/10 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}