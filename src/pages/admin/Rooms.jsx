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
      alert(err?.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Room Management
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create and monitor hostel room occupancy
        </p>
      </div>

      {/* CREATE ROOM CARD */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

        <h2 className="mb-4 text-lg font-semibold text-white">
          Add New Room
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
        >

          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            required
            className="rounded-xl border border-white/10 bg-[#0b1220] px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="floor"
            placeholder="Floor"
            value={form.floor}
            onChange={handleChange}
            required
            className="rounded-xl border border-white/10 bg-[#0b1220] px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="rounded-xl border border-white/10 bg-[#0b1220] px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]"
          >
            Add Room
          </button>

        </form>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">

        <table className="w-full text-sm">

          <thead className="bg-[#111827] text-left text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-4">Room</th>
              <th className="px-4 py-4">Floor</th>
              <th className="px-4 py-4">Capacity</th>
              <th className="px-4 py-4">Occupancy</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">

            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan="5" className="px-4 py-4">
                    <div className="h-5 animate-pulse rounded bg-white/5" />
                  </td>
                </tr>
              ))
            ) : rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-500">
                  No rooms available
                </td>
              </tr>
            ) : (
              rooms.map((room, i) => {
                const percentage =
                  room.capacity > 0
                    ? (room.occupied / room.capacity) * 100
                    : 0;

                const isFull =
                  room.occupied >= room.capacity;

                return (
                  <tr
                    key={room._id}
                    className={`transition ${
                      i % 2 === 0
                        ? "bg-[#0b1220]"
                        : "bg-[#0f172a]"
                    } hover:bg-[#1f2937]`}
                  >

                    <td className="px-4 py-4 font-medium text-white">
                      Room {room.roomNumber}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {room.floor}
                    </td>

                    <td className="px-4 py-4 text-gray-300">
                      {room.capacity}
                    </td>

                    {/* OCCUPANCY */}
                    <td className="px-4 py-4">

                      <div className="h-2 w-full rounded-full bg-white/10">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isFull
                              ? "bg-red-500"
                              : "bg-gradient-to-r from-blue-500 to-cyan-400"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        {room.occupied} / {room.capacity}
                      </p>

                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4">

                      {isFull ? (
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                          Full
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
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