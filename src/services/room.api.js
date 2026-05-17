import api from "./axios";

// Get all rooms
export const getAllRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

// Create room
export const createRoom = async (data) => {
  const response = await api.post("/rooms", data);
  return response.data;
};
