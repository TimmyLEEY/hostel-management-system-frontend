import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

const AddStudent = () => {
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
    parentEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("http://localhost:5000/api/admin/students", {
        ...form,
        year: Number(form.year),
      });

      navigate("/admin/students");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] px-4 py-6 text-white space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Add New Student
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Fill in student and parent details
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl space-y-8"
      >

        {/* Student Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="name" placeholder="Student Name" onChange={handleChange} required />
            <Input name="rollNo" placeholder="Roll Number" onChange={handleChange} required />
            <Input name="year" type="number" placeholder="Year" onChange={handleChange} required />
            <Input name="course" placeholder="Course" onChange={handleChange} required />
            <Input name="branch" placeholder="Branch" onChange={handleChange} required />
            <Input name="section" placeholder="Section (optional)" onChange={handleChange} />
            <Input name="studentPhone" placeholder="Student Phone" onChange={handleChange} required />
            <Input name="studentEmail" type="email" placeholder="Student Email" onChange={handleChange} required />
          </div>
        </div>

        {/* Parent Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="parentName" placeholder="Parent Name" onChange={handleChange} required />
            <Input name="parentPhone" placeholder="Parent Phone" onChange={handleChange} required />
            <Input
              name="parentEmail"
              type="email"
              placeholder="Parent Email"
              onChange={handleChange}
              className="md:col-span-2"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-black hover:bg-cyan-400 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-white hover:border-cyan-400/30 transition"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddStudent;

/* Input */
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40 ${className}`}
    />
  );
}