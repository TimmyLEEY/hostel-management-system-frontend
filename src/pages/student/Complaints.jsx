import { useEffect, useState } from "react";
import api from "../../services/api";

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
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        My Complaints
      </h1>

      {/* Create Complaint Card */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Raise a New Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Complaint Title"
            required
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <textarea
            placeholder="Complaint Description"
            required
            rows="4"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>

      {/* Complaints Grid */}
      {complaints.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No complaints submitted yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {c.title}
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                {c.description}
              </p>

              <div className="mt-4">
                {c.status === "RESOLVED" ? (
                  <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                    Resolved
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}