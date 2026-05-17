// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function AdminNotices() {
//   const [notices, setNotices] = useState([]);
//   const [form, setForm] = useState({ title: "", message: "" });

//   const fetchNotices = async () => {
//     const res = await api.get("/notices");
//     setNotices(res.data);
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const submitNotice = async (e) => {
//     e.preventDefault();

//     if (!form.title || !form.message) {
//       alert("All fields required");
//       return;
//     }

//     await api.post("/notices", form);
//     setForm({ title: "", message: "" });
//     fetchNotices();
//   };

//   const deleteNotice = async (id) => {
//     await api.delete(`/notices/${id}`);
//     fetchNotices();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-orange-500 mb-6">
//         Notices
//       </h1>

//       <form
//         onSubmit={submitNotice}
//         className="bg-white p-4 rounded shadow mb-6 space-y-3"
//       >
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <textarea
//           placeholder="Message"
//           value={form.message}
//           onChange={(e) =>
//             setForm({ ...form, message: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <button className="bg-green-600 text-white px-4 py-2 rounded">
//           Post Notice
//         </button>
//       </form>

//       <div className="space-y-4">
//         {notices.map((n) => (
//           <div
//             key={n._id}
//             className="bg-white p-4 rounded border"
//           >
//             <h3 className="font-semibold">{n.title}</h3>
//             <p className="text-sm">{n.message}</p>
//             <button
//               onClick={() => deleteNotice(n._id)}
//               className="text-red-600 text-xs mt-2"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function AdminNotices() {
//   const [notices, setNotices] = useState([]);
//   const [form, setForm] = useState({ title: "", message: "" });

//   const fetchNotices = async () => {
//     const res = await api.get("/notices");
//     setNotices(res.data);
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const submitNotice = async (e) => {
//     e.preventDefault();

//     if (!form.title || !form.message) {
//       alert("All fields required");
//       return;
//     }

//     await api.post("/notices", form);
//     setForm({ title: "", message: "" });
//     fetchNotices();
//   };

//   const deleteNotice = async (id) => {
//     await api.delete(`/notices/${id}`);
//     fetchNotices();
//   };

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
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Notice Management
      </h1>

      {/* Create Notice Card */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
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
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <textarea
            placeholder="Notice Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Post Notice
          </button>
        </form>
      </div>

      {/* Notices Grid */}
      {notices.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No notices available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notices.map((n) => (
            <div
              key={n._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  {n.message}
                </p>
              </div>

              <button
                onClick={() => deleteNotice(n._id)}
                className="mt-6 text-sm text-red-600 hover:text-red-700 font-medium"
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
