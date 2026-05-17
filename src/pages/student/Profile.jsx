import { useEffect, useState } from "react";
import api from "../../services/api";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/students/me");
      setStudent(res.data);
    } catch (err) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!student) return <p>No profile found</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        My Profile
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-soft space-y-8">

        {/* Student Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <Detail label="Name" value={student.name} />
            <Detail label="Roll No" value={student.rollNo} />
            <Detail label="Course" value={student.course} />
            <Detail label="Branch" value={student.branch} />
            <Detail label="Year" value={student.year} />
            <Detail label="Section" value={student.section || "-"} />
            <Detail label="Student Phone" value={student.studentPhone} />
            <Detail label="Student Email" value={student.studentEmail} />
          </div>
        </div>

        {/* Parent Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <Detail label="Parent Name" value={student.parentName} />
            <Detail label="Parent Phone" value={student.parentPhone} />
            <Detail label="Parent Email" value={student.parentEmail || "-"} />
          </div>
        </div>

        {/* Room Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Room Information
          </h2>

          <div className="text-sm">
            {student.room ? (
              <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                Room {student.room.roomNumber}
              </span>
            ) : (
              <span className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                Not Assigned
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;

/* Reusable */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800 mt-1">{value}</p>
    </div>
  );
}