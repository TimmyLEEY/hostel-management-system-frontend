import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Bell, Calendar, Sparkles } from "lucide-react";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get("/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-20 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-10 pt-24 text-white md:px-8">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3">
              <Bell size={20} className="text-cyan-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Hostel Notices
              </h1>

              <p className="text-sm text-gray-400">
                Important announcements from hostel management
              </p>
            </div>
          </div>
        </motion.div>

        {/* EMPTY STATE */}
        {notices.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-gray-400">
            No notices available at the moment
          </div>
        ) : (
          /* FEED */
          <div className="space-y-5">

            {notices.map((n, index) => (
              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition hover:border-cyan-500/20 hover:bg-white/[0.08]"
              >

                {/* TOP BAR */}
                <div className="flex items-start justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-500/10 p-3">
                      <Sparkles size={18} className="text-cyan-400" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {n.title}
                      </h3>

                      {n.createdAt && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={12} />
                          {new Date(n.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-400">
                  {n.message}
                </p>

                {/* FOOTER ACCENT LINE */}
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}