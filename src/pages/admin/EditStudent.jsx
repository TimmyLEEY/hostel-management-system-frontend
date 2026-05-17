// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getStudentById,
//   updateStudent,
// } from "../../services/student.api";

// const EditStudent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     rollNo: "",
//     year: "",
//     course: "",
//     branch: "",
//     section: "",
//     studentPhone: "",
//     studentEmail: "",
//     parentName: "",
//     parentPhone: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchStudent = async () => {
//     try {
//       setLoading(true);
//       const data = await getStudentById(id);
//       setForm({
//         name: data.name || "",
//         rollNo: data.rollNo || "",
//         year: data.year || "",
//         course: data.course || "",
//         branch: data.branch || "",
//         section: data.section || "",
//         studentPhone: data.studentPhone || "",
//         studentEmail: data.studentEmail || "",
//         parentName: data.parentName || "",
//         parentPhone: data.parentPhone || "",
//       });
//     } catch (err) {
//       setError("Failed to load student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudent();
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await updateStudent(id, {
//         ...form,
//         year: Number(form.year),
//       });
//       navigate(`/admin/students/${id}`);
//     } catch (err) {
//       alert(
//         err?.response?.data?.message ||
//           "Failed to update student"
//       );
//     }
//   };

//   if (loading) {
//     return <p className="p-4">Loading...</p>;
//   }

//   if (error) {
//     return <p className="p-4 text-red-600">{error}</p>;
//   }

//   return (
//     <div className="p-6 max-w-xl">
//       <h1 className="text-2xl font-semibold mb-4">
//         Edit Student
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-3"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="rollNo"
//           placeholder="Roll No"
//           value={form.rollNo}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="number"
//           name="year"
//           placeholder="Year"
//           value={form.year}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="course"
//           placeholder="Course"
//           value={form.course}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="branch"
//           placeholder="Branch"
//           value={form.branch}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="section"
//           placeholder="Section"
//           value={form.section}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="studentPhone"
//           placeholder="Student Phone"
//           value={form.studentPhone}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="email"
//           name="studentEmail"
//           placeholder="Student Email"
//           value={form.studentEmail}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="parentName"
//           placeholder="Parent Name"
//           value={form.parentName}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <input
//           type="text"
//           name="parentPhone"
//           placeholder="Parent Phone"
//           value={form.parentPhone}
//           onChange={handleChange}
//           required
//           className="border p-2 w-full"
//         />

//         <div className="flex gap-3 pt-2">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() =>
//               navigate(`/admin/students/${id}`)
//             }
//             className="px-4 py-2 bg-gray-500 text-white rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;


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
      alert(
        err?.response?.data?.message ||
          "Failed to update student"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Edit Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-soft space-y-8"
      >
        {/* Student Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="name" value={form.name} onChange={handleChange} required />
            <Input name="rollNo" value={form.rollNo} onChange={handleChange} required />
            <Input name="year" type="number" value={form.year} onChange={handleChange} required />
            <Input name="course" value={form.course} onChange={handleChange} required />
            <Input name="branch" value={form.branch} onChange={handleChange} required />
            <Input name="section" value={form.section} onChange={handleChange} />
            <Input name="studentPhone" value={form.studentPhone} onChange={handleChange} required />
            <Input name="studentEmail" type="email" value={form.studentEmail} onChange={handleChange} required />
          </div>
        </div>

        {/* Parent Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="parentName" value={form.parentName} onChange={handleChange} required />
            <Input name="parentPhone" value={form.parentPhone} onChange={handleChange} required />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin/students/${id}`)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;


/* Reusable Input Component */
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full ${className}`}
    />
  );
}