// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function ParentPermissions() {
//   const [permissions, setPermissions] = useState([]);

//   const fetchPermissions = async () => {
//     try {
//       const res = await api.get("/permissions/parent");
//       setPermissions(res.data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to load requests");
//     }
//   };

//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   const acknowledge = async (id) => {
//     try {
//       await api.put(`/permissions/${id}/acknowledge`);
//       fetchPermissions();
//     } catch (err) {
//       alert(err.response?.data?.message || "Acknowledge failed");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">
//         Child Outing Requests
//       </h1>

//       {permissions.length === 0 && (
//         <p className="text-gray-500">No requests found</p>
//       )}

//       {permissions.map((p) => (
//         <div key={p._id} className="border p-3 mb-3">
//           <p><b>Student:</b> {p.student?.name}</p>
//           <p><b>Reason:</b> {p.reason}</p>
//           <p><b>Admin Status:</b> {p.adminStatus}</p>
//           <p><b>Seen:</b> {p.parentAcknowledged ? "Yes" : "No"}</p>

//           <button
//             disabled={p.parentAcknowledged}
//             onClick={() => acknowledge(p._id)}
//             className="bg-blue-500 text-white px-3 py-1 mt-2"
//           >
//             {p.parentAcknowledged ? "Acknowledged" : "Acknowledge"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ParentPermissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      const res = await api.get("/permissions/parent");
      setPermissions(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const acknowledge = async (id) => {
    try {
      await api.put(`/permissions/${id}/acknowledge`);
      fetchPermissions();
    } catch (err) {
      alert(err.response?.data?.message || "Acknowledge failed");
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Child Outing Requests
      </h1>

      {permissions.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No outing requests found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {permissions.map((p) => (
            <div
              key={p._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition"
            >
              {/* Student Name */}
              <h3 className="font-semibold text-lg text-gray-800">
                {p.student?.name}
              </h3>

              {/* Reason */}
              <p className="text-sm text-gray-600 mt-2">
                {p.reason}
              </p>

              {/* Dates */}
              <p className="text-xs text-gray-500 mt-2">
                {new Date(p.fromDate).toLocaleDateString()} →{" "}
                {new Date(p.toDate).toLocaleDateString()}
              </p>

              {/* Status Section */}
              <div className="mt-4 space-y-2 text-xs">

                {/* Admin Status */}
                <div>
                  Admin:{" "}
                  {p.adminStatus === "APPROVED" && (
                    <span className="px-3 py-0 bg-secondary/10 text-secondary rounded-full">
                      Approved
                    </span>
                  )}
                  {p.adminStatus === "REJECTED" && (
                    <span className="px-3 py-0 bg-red-100 text-red-600 rounded-full">
                      Rejected
                    </span>
                  )}
                  {p.adminStatus === "PENDING" && (
                    <span className="px-3 py-0 bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
                    </span>
                  )}
                </div>

                {/* Parent Acknowledged */}
                <div>
                  Seen:{" "}
                  {p.parentAcknowledged ? (
                    <span className="px-3 py-0 bg-primary/10 text-primary rounded-full">
                      Acknowledged
                    </span>
                  ) : (
                    <span className="px-3 py-0 bg-gray-100 text-gray-500 rounded-full">
                      Not Seen
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5">
                <button
                  disabled={p.parentAcknowledged}
                  onClick={() => acknowledge(p._id)}
                  className={`w-full py-2 rounded-lg text-sm transition ${
                    p.parentAcknowledged
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {p.parentAcknowledged
                    ? "Already Acknowledged"
                    : "Acknowledge"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}