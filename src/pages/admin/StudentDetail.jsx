import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../../services/student.api";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    try {
      const data = await getStudentById(id);
      setStudent(data);
    } catch (err) {
      setError("Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-1/3 bg-white/10 rounded-xl" />
          <div className="h-40 bg-white/10 rounded-2xl" />
          <div className="h-40 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-gray-400">
        Student not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-4 py-8 text-white md:px-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Student Details</h1>
        <p className="text-sm text-gray-400">
          Full profile information
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl space-y-10">

        {/* STUDENT INFO */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-white">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Detail label="Name" value={student.name} />
            <Detail label="Roll No" value={student.rollNo} />
            <Detail label="Course" value={student.course} />
            <Detail label="Branch" value={student.branch} />
            <Detail label="Year" value={student.year} />
            <Detail label="Section" value={student.section || "-"} />
            <Detail label="Phone" value={student.studentPhone} />
            <Detail label="Email" value={student.studentEmail} />
          </div>
        </section>

        {/* PARENT INFO */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-white">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Detail label="Parent Name" value={student.parentName} />
            <Detail label="Parent Phone" value={student.parentPhone} />
            <Detail label="Parent Email" value={student.parentEmail || "-"} />
          </div>
        </section>

        {/* ROOM INFO */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-white">
            Room Information
          </h2>

          {student.room ? (
            <span className="inline-block px-4 py-2 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Room {student.room.roomNumber}
            </span>
          ) : (
            <span className="inline-block px-4 py-2 text-xs rounded-full bg-white/10 text-gray-400">
              Not Assigned
            </span>
          )}
        </section>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => navigate(`/admin/students/${id}/edit`)}
            className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:bg-cyan-400"
          >
            Edit Student
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="rounded-xl bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentDetails;

/* Reusable Detail */
function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}