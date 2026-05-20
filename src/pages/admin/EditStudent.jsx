import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getStudentById,
  updateStudent,
} from "../../services/student.api";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    year: "",
    course: "",
    branch: "",
    section: "",
    studentPhone: "",
    studentEmail: "",
    parentName: "",
    parentPhone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudent = async () => {
    try {
      const data = await getStudentById(id);
      setForm({
        name: data.name || "",
        rollNo: data.rollNo || "",
        year: data.year || "",
        course: data.course || "",
        branch: data.branch || "",
        section: data.section || "",
        studentPhone: data.studentPhone || "",
        studentEmail: data.studentEmail || "",
        parentName: data.parentName || "",
        parentPhone: data.parentPhone || "",
      });
    } catch (err) {
      setError("Failed to load student");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, {
        ...form,
        year: Number(form.year),
      });
      navigate(`/admin/students/${id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update student");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-gray-300 flex items-center justify-center">
        Loading student...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 space-y-6 text-gray-200">

      {/* HEADER */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <h1 className="text-xl font-semibold text-white">
          Edit Student
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Update student details
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-8"
      >

        {/* STUDENT INFO */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" value={form.name} onChange={handleChange} />
            <Input name="rollNo" value={form.rollNo} onChange={handleChange} />
            <Input name="year" type="number" value={form.year} onChange={handleChange} />
            <Input name="course" value={form.course} onChange={handleChange} />
            <Input name="branch" value={form.branch} onChange={handleChange} />
            <Input name="section" value={form.section} onChange={handleChange} />
            <Input name="studentPhone" value={form.studentPhone} onChange={handleChange} />
            <Input name="studentEmail" value={form.studentEmail} onChange={handleChange} />
          </div>
        </div>

        {/* PARENT INFO */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="parentName" value={form.parentName} onChange={handleChange} />
            <Input name="parentPhone" value={form.parentPhone} onChange={handleChange} />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            type="submit"
            className="bg-cyan-500 text-black px-6 py-2 rounded-xl hover:bg-cyan-400 transition font-medium"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin/students/${id}`)}
            className="bg-white/10 text-white px-6 py-2 rounded-xl hover:bg-white/20 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;

/* INPUT */
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
    />
  );
}