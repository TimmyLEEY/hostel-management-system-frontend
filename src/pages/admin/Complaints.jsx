
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Student Complaints
      </h1>

      {complaints.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No complaints found
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

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {c.description}
              </p>

              <p className="text-xs text-gray-500 mt-3">
                Student: {c.student?.name}
              </p>

              {/* Status Badge */}
              <div className="mt-3">
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

              {/* Action */}
              {c.status === "PENDING" && (
                <button
                  onClick={() => resolveComplaint(c._id)}
                  className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition text-sm"
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