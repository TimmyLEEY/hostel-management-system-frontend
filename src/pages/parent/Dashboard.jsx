// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function ParentDashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/parent/dashboard");
//         setStats(res.data);
//       } catch (error) {
//         console.error("Parent dashboard load failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <p className="text-gray-600">Loading dashboard...</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-6">
//         Parent Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <DashboardCard
//           title="Pending Outing Requests"
//           value={stats.pendingRequests}
//         />
//       </div>
//     </div>
//   );
// }

// function DashboardCard({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-3xl font-bold text-blue-600 mt-2">
//         {value}
//       </p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ParentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchDashboard = async () => {
  //     try {
  //       const res = await api.get("/parent/dashboard");
  //       setStats(res.data);
  //     } catch (error) {
  //       console.error("Parent dashboard load failed", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboard();
    
  // }, []);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      // 1️⃣ Get parent stats
      const res = await api.get("/parent/dashboard");
      setStats(res.data);

      // 2️⃣ Get notices
      const noticeRes = await api.get("/notices");

      // 3️⃣ Filter notices for PARENT
      const filtered = noticeRes.data.filter((notice) => {
        if (!notice.visibleTo) return true;
        return notice.visibleTo.includes("PARENT");
      });

      setNotices(filtered);

    } catch (error) {
      console.error("Parent dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Failed to load dashboard</p>;

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl shadow-soft flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">
            Welcome 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor your ward’s hostel activities
          </p>
        </div>

        

        <button
          onClick={() => navigate("/parent/permissions")}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm"
        >
          View Outing Requests
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <DashboardCard
          title="Pending Outing Requests"
          value={stats.pendingRequests}
        />

        {/* Placeholder for future expansion */}
        <div className="bg-white p-6 rounded-xl shadow-soft">
          <p className="text-sm text-gray-500">
            Stay updated with notices and permissions
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            Parent Portal
          </p>
        </div>

      </div>

      {/* Notices Section */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold mb-4">
          Latest Notices
        </h2>

        {notices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No notices available
          </p>
        ) : (
          notices.slice(0, 3).map((notice) => (
            <div
              key={notice._id}
              className="border-b pb-3 mb-3"
            >
              <p className="font-semibold text-gray-700">
                {notice.title}
              </p>

              <p className="text-sm text-gray-600 whitespace-pre-line">
                {notice.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-primary mt-2">
        {value}
      </p>
    </div>
  );
}