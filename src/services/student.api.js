import api from "./axios";

// Get all students
export const getAllStudents = async () => {
  const response = await api.get("/admin/students");
  return response.data;
};

export const me = async () => {
  const response = await api.get("/students/:id")
  return response.data;
};

// Get single student
export const getStudentById = async (id) => {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
};

// Create student
export const createStudent = async (data) => {
  const response = await api.post("/admin/students", data);
  return response.data;
};

// Update student details
export const updateStudent = async (id, data) => {
  const response = await api.put(`/admin/students/${id}`, data);
  return response.data;
};

// Assign / change room
export const assignRoom = async (studentId, roomId) => {
  const response = await api.put(
    `/admin/students/${studentId}/assign-room`,
    { roomId }
  );
  return response.data;
};

