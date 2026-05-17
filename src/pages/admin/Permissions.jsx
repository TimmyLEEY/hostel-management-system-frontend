// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function AdminPermissions() {
//   const [permissions, setPermissions] = useState([]);

//   const fetchPermissions = async () => {
//     const res = await api.get("/permissions");
//     setPermissions(res.data);
//   };

//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   const updateStatus = async (id, status) => {
//     await api.put(`/permissions/${id}/status`, { status });
//     fetchPermissions();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Outing Requests</h1>

//       {permissions.map((p) => (
//         <div key={p._id} className="border p-3 mb-3">
//           <p><b>Student:</b> {p.student?.name}</p>
//           <p><b>Reason:</b> {p.reason}</p>
// <p className="text-sm mt-2">
//   Parent:{" "}
//   <span className="font-semibold">
//     {p.parentAcknowledged ? "Seen" : "Not Seen"}
//   </span>{" "}
//   | Admin:{" "}
//   <span
//     className={`font-semibold ${
//       p.adminStatus === "APPROVED"
//         ? "text-green-600"
//         : p.adminStatus === "REJECTED"
//         ? "text-red-600"
//         : "text-yellow-600"
//     }`}
//   >
//     {p.adminStatus}
//   </span>
// </p>
//           {p.adminStatus === "PENDING" ? (
//   <>
//     <button
//       onClick={() => updateStatus(p._id, "APPROVED")}
//       className="bg-green-500 text-white px-3 py-1 mr-2"
//     >
//       Approve
//     </button>
//     <button
//       onClick={() => updateStatus(p._id, "REJECTED")}
//       className="bg-red-500 text-white px-3 py-1"
//     >
//       Reject
//     </button>
//   </>
// ) : (
//   <span className="font-semibold text-gray-600">
//     Decision Locked
//   </span>
// )}

//         </div>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function AdminPermissions() {
//   const [permissions, setPermissions] = useState([]);

//   const fetchPermissions = async () => {
//     const res = await api.get("/permissions");
//     setPermissions(res.data);
//   };

//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   const updateStatus = async (id, status) => {
//     await api.put(`/permissions/${id}/status`, { status });
//     fetchPermissions();
//   };

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminPermissions() {
  const [permissions, setPermissions] = useState([]);

  const fetchPermissions = async () => {
    const res = await api.get("/permissions");
    setPermissions(res.data);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/permissions/${id}/status`, { status });
    fetchPermissions();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Outing Requests
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
              {/* Student */}
              <h3 className="text-lg font-semibold text-gray-800">
                {p.student?.name}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {p.reason}
              </p>

              {/* Status Section */}
              <div className="mt-4 space-y-2">

                {/* Parent Status */}
                <div>
                  <span className="text-xs text-gray-500">
                    Parent:
                  </span>{" "}
                  {p.parentAcknowledged ? (
                    <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                      Seen
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                      Not Seen
                    </span>
                  )}
                </div>

                {/* Admin Status */}
                <div>
                  <span className="text-xs text-gray-500">
                    Admin:
                  </span>{" "}
                  {p.adminStatus === "APPROVED" && (
                    <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                      Approved
                    </span>
                  )}
                  {p.adminStatus === "REJECTED" && (
                    <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                      Rejected
                    </span>
                  )}
                  {p.adminStatus === "PENDING" && (
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5">
                {p.adminStatus === "PENDING" ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        updateStatus(p._id, "APPROVED")
                      }
                      className="flex-1 bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(p._id, "REJECTED")
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 font-medium text-center">
                    Decision Locked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}