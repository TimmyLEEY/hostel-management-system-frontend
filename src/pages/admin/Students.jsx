// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/axios";

// const Students = () => {
//   const navigate = useNavigate();

//   const [students, setStudents] = useState([]);
//   const [rooms, setRooms] = useState([]);

//   const fetchStudents = async () => {
//     const res = await api.get("/admin/students");
//     setStudents(res.data);
//   };

//   const fetchRooms = async () => {
//     const res = await api.get("/rooms");
//     setRooms(res.data);
//   };

//   useEffect(() => {
//     fetchStudents();
//     fetchRooms();
//   }, []);

//   const handleAssignRoom = async (studentId, roomId) => {
//     try {
//       await api.put(`/admin/students/${studentId}/assign-room`, {
//         roomId,
//       });
//       alert("Room assigned successfully");
//       fetchStudents();
//       fetchRooms();
//     } catch (error) {
//       alert(
//         error?.response?.data?.message ||
//           "Failed to assign room"
//       );
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold">Students</h1>
//         <button
//           onClick={() => navigate("/admin/students/add")}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           + Add Student
//         </button>
//       </div>

//       {/* Students Table */}
//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Roll No</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Year</th>
//             <th className="border p-2">Branch</th>
//             <th className="border p-2">Room</th>
//             <th className="border p-2">Assign / Change Room</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id}>
//               <td className="border p-2">{s.rollNo}</td>
//               <td className="border p-2">{s.name}</td>
//               <td className="border p-2">{s.year}</td>
//               <td className="border p-2">{s.branch}</td>

//               {/* Current Room */}
//               <td className="border p-2">
//                 {s.room
//                   ? `${s.room.roomNumber}`
//                   : "Not Assigned"}
//               </td>

//               {/* Assign Room */}
//               <td className="border p-2">
//                 <select
//                   className="border p-1"
//                   onChange={(e) =>
//                     handleAssignRoom(s._id, e.target.value)
//                   }
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Room
//                   </option>
//                   {rooms.map((room) => (
//                     <option key={room._id} value={room._id}>
//                       {room.roomNumber}
//                     </option>
//                   ))}
//                 </select>
//               </td>

//               {/* Actions */}
//               <td className="border p-2 space-x-2">
//                 <button
//                   onClick={() =>
//                     navigate(`/admin/students/${s._id}`)
//                   }
//                   className="text-blue-600"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() =>
//                     navigate(`/admin/students/${s._id}/edit`)
//                   }
//                   className="text-green-600"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Students;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const res = await api.get("/admin/students");
    setStudents(res.data);
  };

  const fetchRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const handleAssignRoom = async (studentId, roomId) => {
    try {
      await api.put(`/admin/students/${studentId}/assign-room`, {
        roomId,
      });
      fetchStudents();
      fetchRooms();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to assign room"
      );
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Students Management
        </h1>

        <button
          onClick={() => navigate("/admin/students/add")}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-soft">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Room</th>
              <th className="px-4 py-3 text-left">Assign Room</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{s.rollNo}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {s.name}
                  </td>
                  <td className="px-4 py-3">{s.year}</td>
                  <td className="px-4 py-3">{s.branch}</td>

                  {/* Room Badge */}
                  <td className="px-4 py-3">
                    {s.room ? (
                      <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                        {s.room.roomNumber}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                        Not Assigned
                      </span>
                    )}
                  </td>

                  {/* Assign Room */}
                  <td className="px-4 py-3">
                    <select
                      className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      onChange={(e) =>
                        handleAssignRoom(s._id, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Room
                      </option>
                      {rooms.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.roomNumber}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/students/${s._id}`)
                      }
                      className="text-primary hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/students/${s._id}/edit`)
                      }
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;