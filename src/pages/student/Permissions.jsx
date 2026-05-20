import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import {
  Calendar,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

export default function StudentPermissions() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/permissions/my");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const submitRequest = async (e) => {
    e.preventDefault();

    if (!form.reason || !form.fromDate || !form.toDate) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/permissions", form);
      setForm({ reason: "", fromDate: "", toDate: "" });
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-10 pt-24 text-white md:px-8">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Outing Requests
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Submit and track your permission requests in real time
          </p>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3">
              <Calendar size={20} className="text-cyan-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Request New Outing
              </h2>

              <p className="text-xs text-gray-400">
                Fill in your travel details for approval
              </p>
            </div>
          </div>

          <form onSubmit={submitRequest} className="space-y-4">

            {/* REASON */}
            <input
              type="text"
              placeholder="Reason for outing"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
            />

            {/* DATES */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <input
                type="date"
                value={form.fromDate}
                onChange={(e) =>
                  setForm({ ...form, fromDate: e.target.value })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
              />

              <input
                type="date"
                value={form.toDate}
                onChange={(e) =>
                  setForm({ ...form, toDate: e.target.value })
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Submit Request
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* EMPTY STATE */}
        {requests.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-gray-400">
            No outing requests submitted yet
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {requests.map((r, index) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition hover:border-cyan-500/20 hover:bg-white/[0.08]"
              >

                {/* TITLE */}
                <h3 className="text-lg font-semibold">
                  {r.reason}
                </h3>

                {/* DATE RANGE */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={14} />

                  {new Date(r.fromDate).toLocaleDateString()} →{" "}
                  {new Date(r.toDate).toLocaleDateString()}
                </div>

                {/* STATUS BLOCK */}
                <div className="mt-5 space-y-3">

                  {/* PARENT */}
                  <StatusRow
                    label="Parent"
                    value={
                      r.parentAcknowledged ? "Seen" : "Not Seen"
                    }
                    type={r.parentAcknowledged ? "good" : "neutral"}
                    icon={Eye}
                  />

                  {/* ADMIN */}
                  <StatusRow
                    label="Admin"
                    value={r.adminStatus}
                    type={
                      r.adminStatus === "APPROVED"
                        ? "good"
                        : r.adminStatus === "REJECTED"
                        ? "bad"
                        : "warn"
                    }
                    icon={
                      r.adminStatus === "APPROVED"
                        ? CheckCircle2
                        : r.adminStatus === "REJECTED"
                        ? XCircle
                        : Clock
                    }
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================
// STATUS ROW COMPONENT
// =============================
function StatusRow({ label, value, icon: Icon, type }) {
  const styles = {
    good: "border-green-500/20 bg-green-500/10 text-green-300",
    bad: "border-red-500/20 bg-red-500/10 text-red-300",
    warn: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    neutral: "border-white/10 bg-white/[0.05] text-gray-300",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>

      <div
        className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${styles[type]}`}
      >
        <Icon size={12} />
        {value}
      </div>
    </div>
  );
}