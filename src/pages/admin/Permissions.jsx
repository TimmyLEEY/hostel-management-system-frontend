import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await api.get("/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const resolveComplaint = async (id) => {
    const remark = prompt("Enter admin remark:");
    if (!remark) return;

    await api.put(`/complaints/${id}/resolve`, {
      adminRemark: remark,
    });

    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-[#070B14] px-4 py-6 space-y-6 text-white">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Student Complaints
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Track and resolve student issues
        </p>
      </div>

      {/* Empty State */}
      {complaints.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60 backdrop-blur-xl">
          No complaints found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {complaints.map((c) => (
            <div
              key={c._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg hover:border-cyan-400/30 transition"
            >

              {/* Title */}
              <h3 className="text-lg font-semibold text-white">
                {c.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 mt-2 line-clamp-3">
                {c.description}
              </p>

              {/* Student */}
              <p className="text-xs text-white/40 mt-3">
                Student:{" "}
                <span className="text-white/80">
                  {c.student?.name}
                </span>
              </p>

              {/* Status */}
              <div className="mt-4">
                {c.status === "RESOLVED" ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Resolved
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    Pending
                  </span>
                )}
              </div>

              {/* Action */}
              {c.status === "PENDING" && (
                <button
                  onClick={() => resolveComplaint(c._id)}
                  className="mt-5 w-full rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold py-2 transition"
                >
                  Resolve Complaint
                </button>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}