// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function Notices() {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     api.get("/notices").then((res) => setNotices(res.data));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-6">
//         Notices
//       </h1>

//       <div className="space-y-4">
//         {notices.map((n) => (
//           <div
//             key={n._id}
//             className="bg-white p-4 rounded border"
//           >
//             <h3 className="font-semibold">{n.title}</h3>
//             <p className="text-sm">{n.message}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get("/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <p>Loading notices...</p>;

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Hostel Notices
      </h1>

      {notices.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No notices available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notices.map((n) => (
            <div
              key={n._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {n.title}
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                {n.message}
              </p>

              {/* Optional: Show date if backend provides createdAt */}
              {n.createdAt && (
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
