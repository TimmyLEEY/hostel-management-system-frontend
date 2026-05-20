import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [studentsRes, roomsRes] = await Promise.all([
        api.get("/admin/students"),
        api.get("/rooms"),
      ]);

      setStudents(studentsRes.data);
      setRooms(roomsRes.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRoom = async (studentId, roomId) => {
    try {
      await api.put(`/admin/students/${studentId}/assign-room`, {
        roomId,
      });
      fetchData();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to assign room");
    }
  };

  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.rollNo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-gray-100">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Students Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage students, assign rooms, and track records
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/students/add")}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          + Add Student
        </button>

      </div>

      {/* SEARCH */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          className="w-full bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">

        <div className="max-h-[70vh] overflow-auto">

          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="sticky top-0 z-10 bg-[#111827] text-left text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-4">Roll No</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Year</th>
                <th className="px-4 py-4">Branch</th>
                <th className="px-4 py-4">Room</th>
                <th className="px-4 py-4">Assign</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">

              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan="7" className="px-4 py-4">
                      <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                    </td>
                  </tr>
                ))
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => (
                  <tr
                    key={s._id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-[#0b1220]" : "bg-[#0f172a]"
                    } hover:bg-[#1f2937]`}
                  >

                    {/* ROLL */}
                    <td className="px-4 py-4 text-gray-300">
                      {s.rollNo}
                    </td>

                    {/* NAME */}
                    <td className="px-4 py-4 font-medium text-white">
                      {s.name}
                    </td>

                    {/* YEAR */}
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                        Year {s.year}
                      </span>
                    </td>

                    {/* BRANCH */}
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-pink-500/10 px-2 py-1 text-xs text-pink-300">
                        {s.branch}
                      </span>
                    </td>

                    {/* ROOM */}
                    <td className="px-4 py-4">
                      {s.room ? (
                        <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-300">
                          Room {s.room.roomNumber}
                        </span>
                      ) : (
                        <span className="rounded-md bg-gray-500/10 px-2 py-1 text-xs text-gray-400">
                          Not assigned
                        </span>
                      )}
                    </td>

                    {/* ASSIGN */}
                    <td className="px-4 py-4">
                      <select
                        className="rounded-lg border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                        onChange={(e) =>
                          handleAssignRoom(s._id, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select room
                        </option>
                        {rooms.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.roomNumber}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">
                      <div className="flex gap-4 text-sm">

                        <button
                          onClick={() =>
                            navigate(`/admin/students/${s._id}`)
                          }
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/students/${s._id}/edit`)
                          }
                          className="text-green-400 hover:text-green-300"
                        >
                          Edit
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}