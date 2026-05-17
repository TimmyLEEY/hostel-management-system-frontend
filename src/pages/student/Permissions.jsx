// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function StudentPermissions() {
//   const [requests, setRequests] = useState([]);
//   const [form, setForm] = useState({
//     reason: "",
//     fromDate: "",
//     toDate: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch student's own outing requests
//   const fetchRequests = async () => {
//     try {
//       const res = await api.get("/permissions/my");
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Failed to fetch requests", err);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Submit new outing request
//   const submitRequest = async (e) => {
//     e.preventDefault();

//     // ✅ FRONTEND VALIDATION (IMPORTANT)
//     if (!form.reason || !form.fromDate || !form.toDate) {
//       alert("All fields are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       await api.post("/permissions", form);

//       // Reset form after success
//       setForm({
//         reason: "",
//         fromDate: "",
//         toDate: "",
//       });

//       // Reload requests
//       fetchRequests();
//     } catch (err) {
//       // ✅ SHOW ACTUAL BACKEND ERROR
//       alert(
//         err.response?.data?.message || "Failed to submit request"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-6">
//         Outing Requests
//       </h1>

//       {/* New Request Form */}
//       <form
//         onSubmit={submitRequest}
//         className="bg-white p-6 rounded shadow mb-6 space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Reason"
//           value={form.reason}
//           onChange={(e) =>
//             setForm({ ...form, reason: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="date"
//             value={form.fromDate}
//             onChange={(e) =>
//               setForm({ ...form, fromDate: e.target.value })
//             }
//             className="border px-3 py-2 rounded"
//           />
//           <input
//             type="date"
//             value={form.toDate}
//             onChange={(e) =>
//               setForm({ ...form, toDate: e.target.value })
//             }
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Submitting..." : "Submit Request"}
//         </button>
//       </form>

//       {/* Requests List */}
//       <div className="space-y-4">
//         {requests.length === 0 && (
//           <p className="text-gray-500 text-sm">
//             No outing requests submitted yet.
//           </p>
//         )}

//         {requests.map((r) => (
//           <div
//             key={r._id}
//             className="bg-white p-4 rounded border"
//           >
//             <p className="font-semibold">{r.reason}</p>
//             <p className="text-sm text-gray-600">
//               {r.fromDate} → {r.toDate}
//             </p>
//             <p className="text-xs mt-2">
//               Parent:{" "}
//               <span className="font-medium">
//                 {r.parentAcknowledged ? "Seen" : "Not Seen"}
//               </span>{" "}
//             | Admin:{" "}
//               <span className="font-medium">
//                 {r.adminStatus}
//               </span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

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
      alert(
        err.response?.data?.message || "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Outing Requests
      </h1>

      {/* Create Request Card */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Request New Outing
        </h2>

        <form onSubmit={submitRequest} className="space-y-4">
          <input
            type="text"
            placeholder="Reason for outing"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={form.fromDate}
              onChange={(e) =>
                setForm({ ...form, fromDate: e.target.value })
              }
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <input
              type="date"
              value={form.toDate}
              onChange={(e) =>
                setForm({ ...form, toDate: e.target.value })
              }
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No outing requests submitted yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {r.reason}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {new Date(r.fromDate).toLocaleDateString()} →{" "}
                {new Date(r.toDate).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-2 text-xs">

                {/* Parent Status */}
                <div>
                  Parent:{" "}
                  {r.parentAcknowledged ? (
                    <span className="px-3 py-0 bg-secondary/10 text-secondary rounded-full">
                      Seen
                    </span>
                  ) : (
                    <span className="px-3 py-0 bg-gray-100 text-gray-500 rounded-full">
                      Not Seen
                    </span>
                  )}
                </div>

                {/* Admin Status */}
                <div>
                  Admin:{" "}
                  {r.adminStatus === "APPROVED" && (
                    <span className="px-3 py-0 bg-secondary/10 text-secondary rounded-full">
                      Approved
                    </span>
                  )}
                  {r.adminStatus === "REJECTED" && (
                    <span className="px-3 py-0 bg-red-100 text-red-600 rounded-full">
                      Rejected
                    </span>
                  )}
                  {r.adminStatus === "PENDING" && (
                    <span className="px-3 py-0 bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}