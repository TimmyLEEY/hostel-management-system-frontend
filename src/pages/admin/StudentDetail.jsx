// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getStudentById } from "../../services/student.api";

// const StudentDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchStudent = async () => {
//     try {
//       setLoading(true);
//       const data = await getStudentById(id);
//       setStudent(data);
//     } catch (err) {
//       setError("Failed to load student details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudent();
//   }, [id]);

//   if (loading) {
//     return <p className="p-4">Loading student...</p>;
//   }

//   if (error) {
//     return <p className="p-4 text-red-600">{error}</p>;
//   }

//   if (!student) {
//     return <p className="p-4">Student not found</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">
//         Student Details
//       </h1>

//       <div className="space-y-2">
//         <p>
//           <strong>Name:</strong> {student.name}
//         </p>
//         <p>
//           <strong>Roll No:</strong> {student.rollNo}
//         </p>
//         <p>
//           <strong>Course:</strong> {student.course}
//         </p>
//         <p>
//           <strong>Branch:</strong> {student.branch}
//         </p>
//         <p>
//           <strong>Year:</strong> {student.year}
//         </p>
//         <p>
//           <strong>Section:</strong> {student.section}
//         </p>
//         <p>
//           <strong>Student Phone:</strong>{" "}
//           {student.studentPhone}
//         </p>
//         <p>
//           <strong>Student Email:</strong>{" "}
//           {student.studentEmail}
//         </p>
//         <p>
//           <strong>Parent Name:</strong>{" "}
//           {student.parentName}
//         </p>
//         <p>
//           <strong>Parent Phone:</strong>{" "}
//           {student.parentPhone}
//         </p>
//         <p>
//           <strong>Parent Email:</strong>{" "}
//           {student.parentEmail}
//         </p>
//         <p>
//           <strong>Assigned Room:</strong>{" "}
//           {student.room
//             ? student.room.roomNumber
//             : "Not Assigned"}
//         </p>
//         {/* <p>
//           <strong>Local Guardian Name:</strong>{" "}
//           {student.localGuardianName}
//         </p>
//         <p>
//           <strong>Local Guardian Phone:</strong>{" "}
//           {student.localGuardianPhone}  
//         </p>
//         <p>
//           <strong>Local Guardian Address:</strong>{" "}
//           {student.localGuardianAddress}
//         </p> */}
//       </div>

//       <div className="mt-6 space-x-3">
//         <button
//           onClick={() =>
//             navigate(`/admin/students/${id}/edit`)
//           }
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => navigate("/admin/students")}
//           className="px-4 py-2 bg-gray-500 text-white rounded"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;

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

  if (loading) return <p>Loading student...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">
        Student Details
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-soft space-y-8">

        {/* Student Information */}
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

        {/* Parent Information */}
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

        {/* Room Information */}
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

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            onClick={() => navigate(`/admin/students/${id}/edit`)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Edit Student
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;


/* Reusable Detail Row */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800 mt-1">{value}</p>
    </div>
  );
}