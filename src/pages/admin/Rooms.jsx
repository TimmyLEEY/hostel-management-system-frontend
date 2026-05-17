// import { useEffect, useState } from "react";
// import { getAllRooms, createRoom } from "../../services/room.api";

// const Rooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     roomNumber: "",
//     floor: "",
//     capacity: "",
//   });

//   const fetchRooms = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllRooms();
//       setRooms(data);
//     } catch (err) {
//       setError("Failed to load rooms");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await createRoom({
//         roomNumber: form.roomNumber,
//         floor: Number(form.floor),
//         capacity: Number(form.capacity),
//       });
//       setForm({ roomNumber: "", floor: "", capacity: "" });
//       fetchRooms();
//     } catch (err) {
//       alert(
//         err?.response?.data?.message || "Failed to create room"
//       );
//     }
//   };

//   if (loading) {
//     return <p className="p-4">Loading rooms...</p>;
//   }

//   if (error) {
//     return <p className="p-4 text-red-600">{error}</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Rooms</h1>

//       {/* Create Room */}
//       <form
//         onSubmit={handleSubmit}
//         className="mb-6 flex flex-wrap gap-3"
//       >
//         <input
//           type="text"
//           name="roomNumber"
//           placeholder="Room Number"
//           value={form.roomNumber}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <input
//           type="number"
//           name="floor"
//           placeholder="Floor"
//           value={form.floor}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <input
//           type="number"
//           name="capacity"
//           placeholder="Capacity"
//           value={form.capacity}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Add Room
//         </button>
//       </form>

//       {/* Rooms Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Room No</th>
//               <th className="border p-2">Floor</th>
//               <th className="border p-2">Capacity</th>
//               <th className="border p-2">Occupied</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((room) => (
//               <tr key={room._id} className="text-center">
//                 <td className="border p-2">
//                   {room.roomNumber}
//                 </td>
//                 <td className="border p-2">{room.floor}</td>
//                 <td className="border p-2">
//                   {room.capacity}
//                 </td>
//                 <td className="border p-2">
//                   {room.occupied}
//                 </td>
//               </tr>
//             ))}
//             {rooms.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="p-4 text-center text-gray-500"
//                 >
//                   No rooms available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Rooms;


import { useEffect, useState } from "react";
import { getAllRooms, createRoom } from "../../services/room.api";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    roomNumber: "",
    floor: "",
    capacity: "",
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRoom({
        roomNumber: form.roomNumber,
        floor: Number(form.floor),
        capacity: Number(form.capacity),
      });
      setForm({ roomNumber: "", floor: "", capacity: "" });
      fetchRooms();
    } catch (err) {
      alert(
        err?.response?.data?.message || "Failed to create room"
      );
    }
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Room Management
      </h1>

      {/* Create Room Card */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Room
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <input
            type="number"
            name="floor"
            placeholder="Floor"
            value={form.floor}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <button
            type="submit"
            className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 transition"
          >
            Add Room
          </button>
        </form>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Room No</th>
              <th className="px-4 py-3 text-left">Floor</th>
              <th className="px-4 py-3 text-left">Capacity</th>
              <th className="px-4 py-3 text-left">Occupancy</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No rooms available
                </td>
              </tr>
            ) : (
              rooms.map((room) => {
                const percentage =
                  (room.occupied / room.capacity) * 100;

                const isFull = room.occupied >= room.capacity;

                return (
                  <tr
                    key={room._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {room.roomNumber}
                    </td>
                    <td className="px-4 py-3">{room.floor}</td>
                    <td className="px-4 py-3">{room.capacity}</td>

                    {/* Occupancy Progress */}
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {room.occupied} / {room.capacity}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      {isFull ? (
                        <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                          Full
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                          Available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;