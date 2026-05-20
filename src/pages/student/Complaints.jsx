import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Send, MessageSquare, AlertCircle } from "lucide-react";

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    const res = await api.get("/complaints/my");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/complaints", form);
      setForm({ title: "", description: "" });
      await fetchComplaints();
    } catch (err) {
      alert("Failed to submit complaint");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen space-y-8 bg-[#030712] px-4 pb-10 pt-24 text-white md:px-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Complaints
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Submit and track your hostel issues in real time.
        </p>
      </div>

      {/* CREATE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/10 p-3">
            <MessageSquare className="text-cyan-400" size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Raise a New Ticket
            </h2>

            <p className="text-xs text-gray-400">
              Describe your issue clearly for faster resolution
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Complaint title"
            required
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Describe your issue..."
            required
            rows="4"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                Submit Ticket
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
      {complaints.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-gray-400">
          <AlertCircle className="mx-auto mb-3 text-cyan-400" size={24} />
          No complaints submitted yet
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {complaints.map((c, index) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-[24px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition hover:border-cyan-500/20 hover:bg-white/[0.08]"
            >

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-white">
                {c.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm leading-7 text-gray-400">
                {c.description}
              </p>

              {/* STATUS */}
              <div className="mt-5 flex items-center justify-between">

                {c.status === "RESOLVED" ? (
                  <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-300">
                    Resolved
                  </span>
                ) : (
                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
                    Pending
                  </span>
                )}

                <span className="text-xs text-gray-500">
                  Ticket #{c._id.slice(-5)}
                </span>

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}