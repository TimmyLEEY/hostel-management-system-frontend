import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Student Complaints
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage and resolve hostel complaints
        </p>
      </div>

      {/* EMPTY STATE */}
      {complaints.length === 0 && !loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
          No complaints found
        </div>
      ) : null}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-white/5"
              />
            ))
          : complaints.map((c) => {
              const isResolved = c.status === "RESOLVED";

              return (
                <div
                  key={c._id}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 transition hover:border-white/20"
                >

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold text-white">
                    {c.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                    {c.description}
                  </p>

                  {/* STUDENT */}
                  <div className="mt-4 text-xs text-gray-400">
                    Student:
                    <span className="ml-1 text-gray-200">
                      {c.student?.name || "Unknown"}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div className="mt-4">

                    {isResolved ? (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                        Resolved
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                        Pending
                      </span>
                    )}

                  </div>

                  {/* ACTION */}
                  {!isResolved && (
                    <button
                      onClick={() => resolveComplaint(c._id)}
                      className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2 text-sm font-medium text-white transition hover:scale-[1.02]"
                    >
                      Resolve Complaint
                    </button>
                  )}

                </div>
              );
            })}

      </div>
    </div>
  );
}