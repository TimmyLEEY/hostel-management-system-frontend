// ==========================================
// PREMIUM STUDENT DASHBOARD
// Modern SaaS Dashboard Experience
// ==========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Clock3,
} from "lucide-react";

import { motion } from "framer-motion";

import api from "../../services/api";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/student/dashboard");

        setStats(res.data);

        const noticeRes = await api.get("/notices");

        const filtered = noticeRes.data.filter((notice) => {
          if (!notice.visibleTo) return true;

          return (
            notice.visibleTo.includes("STUDENT") ||
            notice.visibleTo.includes("ALL")
          );
        });

        setNotices(filtered);
      } catch (error) {
        console.error("Dashboard load failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <div className="space-y-4 animate-pulse">
          <div className="h-32 rounded-3xl bg-white/[0.05]" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-40 rounded-3xl bg-white/[0.05]" />
            <div className="h-40 rounded-3xl bg-white/[0.05]" />
          </div>

          <div className="h-64 rounded-3xl bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-center text-red-400">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-10 pt-28 text-white md:px-8">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles size={16} />
                Student Workspace
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Welcome Back 👋
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
                Track complaints, manage outing requests, and stay updated
                with the latest hostel announcements through your premium
                student portal.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/student/complaints")}
                className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-sm font-medium shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                Raise Complaint

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => navigate("/student/permissions")}
                className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
              >
                Request Outing
              </button>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <DashboardCard
            title="My Complaints"
            value={stats.myComplaints}
            icon={AlertTriangle}
            color="from-cyan-500/20 to-blue-500/10"
          />

          <DashboardCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={ShieldCheck}
            color="from-emerald-500/20 to-green-500/10"
          />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* NOTICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-2 rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Latest Notices
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Important hostel updates and announcements.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.05] p-3">
                <Bell size={20} className="text-cyan-400" />
              </div>
            </div>

            {notices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">
                No notices available
              </div>
            ) : (
              <div className="space-y-4">
                {notices.slice(0, 4).map((notice, index) => (
                  <motion.div
                    key={notice._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="group rounded-3xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {notice.title}
                        </h3>

                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-400">
                          {notice.message}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-cyan-500/10 p-3">
                        <Bell
                          size={18}
                          className="text-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <Clock3 size={14} />

                      {new Date(
                        notice.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* INFO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Student Portal
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Quick information
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.05] p-3">
                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem text="Track hostel complaints in real-time." />

              <InfoItem text="Request outings with approval workflow." />

              <InfoItem text="Receive notices instantly from management." />

              <InfoItem text="Access a premium modern student experience." />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PREMIUM STATS CARD
// ==========================================

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${color} p-6 backdrop-blur-2xl`}
    >
      {/* Glow */}
      <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight">
            {value}
          </h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-4">
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// INFO ITEM
// ==========================================

function InfoItem({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />

      <p className="text-sm leading-7 text-gray-400">
        {text}
      </p>
    </div>
  );
}