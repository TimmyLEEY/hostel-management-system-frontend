import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/student/dashboard");
        setStats(res.data);

        const noticeRes = await api.get("/notices");

        const filtered = noticeRes.data.filter((notice) => {
          if (!notice.visibleTo) return true;
          return notice.visibleTo.includes("PARENT");
        });

        setNotices(filtered);
      } catch (error) {
        console.error("Dashboard load failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return <p className="p-4 text-sm text-gray-600">Loading dashboard...</p>;

  if (!stats)
    return <p className="p-4 text-sm text-red-500">Failed to load dashboard</p>;

  return (
    <div className="space-y-6 px-4 md:px-6">

      {/* Welcome Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-soft flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Welcome Back 👋
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your hostel activities here
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

          <button
            onClick={() => navigate("/student/complaints")}
            className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm"
          >
            Raise Complaint
          </button>

          <button
            onClick={() => navigate("/student/permissions")}
            className="w-full sm:w-auto bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition text-sm"
          >
            Request Outing
          </button>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

        <DashboardCard
          title="My Complaints"
          value={stats.myComplaints}
          color="text-blue-600"
        />

        <DashboardCard
          title="Pending Outing Requests"
          value={stats.pendingRequests}
          color="text-green-600"
        />

      </div>

      {/* Notices */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-soft">

        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Latest Notices
        </h2>

        {notices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No notices available
          </p>
        ) : (
          notices.slice(0, 3).map((notice) => (
            <div key={notice._id} className="border-b pb-3 mb-3">

              <p className="font-semibold text-gray-700 text-sm sm:text-base">
                {notice.title}
              </p>

              <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                {notice.message}
              </p>

              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-soft">

        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
          Student Portal
        </h2>

        <p className="text-xs sm:text-sm text-gray-600">
          Here you can track your complaints, submit outing requests, and stay updated with hostel notices.
        </p>

      </div>
    </div>
  );
}

/* ✅ FIXED CARD (no dynamic Tailwind issue) */
function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-soft">

      <p className="text-xs sm:text-sm text-gray-500">
        {title}
      </p>

      <p className={`text-2xl sm:text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>

    </div>
  );
}