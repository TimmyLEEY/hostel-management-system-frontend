import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });

  const fetchNotices = async () => {
    const res = await api.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const submitNotice = async (e) => {
    e.preventDefault();

    if (!form.title || !form.message) {
      alert("All fields required");
      return;
    }

    await api.post("/notices", form);
    setForm({ title: "", message: "" });
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await api.delete(`/notices/${id}`);
    fetchNotices();
  };

  return (
    <div className="min-h-screen bg-[#070B14] px-4 py-6 space-y-6 text-white">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Notice Management
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Create and manage hostel announcements
        </p>
      </div>

      {/* Create Notice */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <h2 className="text-lg font-semibold mb-4 text-white">
          Post New Notice
        </h2>

        <form onSubmit={submitNotice} className="space-y-4">

          <input
            type="text"
            placeholder="Notice Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
          />

          <textarea
            placeholder="Notice Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            rows="4"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40"
          />

          <button
            type="submit"
            className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black hover:bg-cyan-400 transition"
          >
            Post Notice
          </button>
        </form>
      </div>

      {/* Notices Grid */}
      {notices.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No notices available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {notices.map((n) => (
            <div
              key={n._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-cyan-400/30 transition flex flex-col justify-between"
            >

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {n.title}
                </h3>

                <p className="text-sm text-white/60 mt-3">
                  {n.message}
                </p>
              </div>

              <button
                onClick={() => deleteNotice(n._id)}
                className="mt-6 text-sm font-medium text-red-400 hover:text-red-300 transition"
              >
                Delete Notice
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}