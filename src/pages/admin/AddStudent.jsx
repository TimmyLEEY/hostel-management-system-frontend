// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/axios";

// const AddStudent = () => {
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
//     parentEmail: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       await api.post("/admin/students", {
//         ...form,
//         year: Number(form.year),
//       });
//       alert("Student created successfully");
//       navigate("/admin/students");
//     } catch (error) {
//       alert(
//         error?.response?.data?.message ||
//           "Failed to create student"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl">
//       <h1 className="text-2xl font-semibold mb-4">
//         Add Student
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-2 gap-4"
//       >
//         <input
//           name="name"
//           placeholder="Student Name"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="rollNo"
//           placeholder="Roll Number"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="year"
//           type="number"
//           placeholder="Year"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="course"
//           placeholder="Course"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="branch"
//           placeholder="Branch"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="section"
//           placeholder="Section"
//           onChange={handleChange}
//           className="border p-2"
//         />

//         <input
//           name="studentPhone"
//           placeholder="Student Phone"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="studentEmail"
//           type="email"
//           placeholder="Student Email"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="parentName"
//           placeholder="Parent Name"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="parentPhone"
//           placeholder="Parent Phone"
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />

//         <input
//           name="parentEmail"
//           type="email"
//           placeholder="Parent Email"
//           onChange={handleChange}
//           required
//           className="border p-2 col-span-2"
//         />

//         <div className="col-span-2 flex gap-3 mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             {loading ? "Saving..." : "Save Student"}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/admin/students")}
//             className="px-4 py-2 bg-gray-500 text-white rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

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
      alert(
        error?.response?.data?.message ||
          "Failed to create student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Add New Student
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

            <Input
              name="name"
              placeholder="Student Name"
              onChange={handleChange}
              required
            />

            <Input
              name="rollNo"
              placeholder="Roll Number"
              onChange={handleChange}
              required
            />

            <Input
              name="year"
              type="number"
              placeholder="Year"
              onChange={handleChange}
              required
            />

            <Input
              name="course"
              placeholder="Course"
              onChange={handleChange}
              required
            />

            <Input
              name="branch"
              placeholder="Branch"
              onChange={handleChange}
              required
            />

            <Input
              name="section"
              placeholder="Section"
              onChange={handleChange}
            />

            <Input
              name="studentPhone"
              placeholder="Student Phone"
              onChange={handleChange}
              required
            />

            <Input
              name="studentEmail"
              type="email"
              placeholder="Student Email"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Parent Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
              name="parentName"
              placeholder="Parent Name"
              onChange={handleChange}
              required
            />

            <Input
              name="parentPhone"
              placeholder="Parent Phone"
              onChange={handleChange}
              required
            />

            <Input
              name="parentEmail"
              type="email"
              placeholder="Parent Email"
              onChange={handleChange}
              required
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;


/* Reusable Input Component */
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
    />
  );
}