import api from "./api";
import axios from "axios";

export const getStudents = (params) =>
  api.get("/admin/students", { params });

export const getStudentById = (id) =>
  api.get(`/admin/students/${id}`);

// export const createStudent = (formData) =>
//   api.post("/admin/students", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

export const createStudent = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/admin/students",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const fetchStudents = async () => {
  const token = localStorage.getItem("token");

  return axios.get(
    "http://localhost:5000/api/admin/students",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



export const updateStudent = (id, formData) =>
  api.put(`/admin/students/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteStudent = (id) =>
  api.delete(`/admin/students/${id}`);
