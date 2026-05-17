import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../../services/adminStudents";
import api from "../../services/api";

export default function StudentForm() {

  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [parentName, setParentName] = useState("");
const [block, setBlock] = useState("");

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    year: "",
    course: "",
    branch: "",
    section: "",
    roomNumber: "",
    studentPhone: "",
    studentEmail: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    localContactName: "",
    localContactRelation: "",
    localContactPhone: "",
  });
  // console.log("STUDENT PAYLOAD:", form);

  const [photo, setPhoto] = useState(null);
  
  useEffect(() => {
    api.get("/rooms/available").then((res) => setRooms(res.data));
    
    if (isEdit) {
      getStudentById(id).then((res) => {
        setForm(res.data);
      });
    }
  }, [id, isEdit]);
  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

  const payload = {
    name: form.name,
    email: form.studentEmail,              // ✅ REQUIRED
    rollNumber: form.rollNo,         // ✅ FIXED
    branch: form.branch,
    year: form.year,
    course: form.course,
    section: form.section,
    roomId: form.roomId,                   // ✅ REQUIRED
    phone: form.studentPhone,
    parentPhone: form.parentPhone,
    parentName: form.parentName,
    parentEmail: form.parentEmail,
    localContactName: form.localContactName,
    localContactRelation: form.localContactRelation,
    localContactPhone: form.localContactPhone,
  // address: form.address,
    // gender: form.gender,
    block: form.block
  };

  console.log("FINAL STUDENT PAYLOAD:", payload);

  // await createStudent(payload);
  try {
    const response = await createStudent(payload);

  console.log("CREATE STUDENT RESPONSE:", response);
  
  if (response.status === 201) {
    alert("Student added successfully");
  }
  navigate("/admin/students");

  } catch (error) {
  console.error(
    "CREATE STUDENT ERROR:",
    error.response?.data || error.message
  );

  if (error.response?.status === 400) {
    alert(error.response.data.message);
  } else {
    alert("Something went wrong. Please try again.");
  }
}

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-blue-700">
        {isEdit ? "Edit Student" : "Add Student"}
      </h1>

      {/* BASIC */}
      <div className="grid grid-cols-2 gap-4 ">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="rollNo" placeholder="Roll No" onChange={handleChange} required />
<select name="year" onChange={handleChange} required>
  <option value="">Select Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>
        <input name="course" placeholder="Course" onChange={handleChange} required />
        <input name="branch" placeholder="Branch" onChange={handleChange} required />
        <input name="section" placeholder="Section" onChange={handleChange} required />
      </div>

      {/* HOSTEL */}
      <div className="grid grid-cols-2 gap-4">
        {/* <select name="hostelBlock" onChange={handleChange} required>
          <option value="">Select Block</option>
          {[...new Set(rooms.map((r) => r.block))].map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select> */}

        <select
        name="roomId"
        onChange={handleChange}
        required
        >
        <option value="">Select Room</option>
        {rooms.map((r) => (
            <option key={r._id} value={r._id}>
            Block {r.block} – Room {r.roomNumber}
            </option>
        ))}
        </select>

      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <input name="studentPhone" placeholder="Student Phone" onChange={handleChange} required />
        <input name="studentEmail" placeholder="Student Email" onChange={handleChange} required />
        <input name="parentName" placeholder="Parent Name" onChange={handleChange} required />
        <input name="parentPhone" placeholder="Parent Phone" onChange={handleChange} required />
        <input name="parentEmail" placeholder="Parent Email" onChange={handleChange} />
      </div>

      {/* LOCAL CONTACT */}
      <div className="grid grid-cols-2 gap-4">
        <input name="localContactName" placeholder="Local Contact Name" onChange={handleChange} />
        <input name="localContactRelation" placeholder="Relation" onChange={handleChange} />
        <input name="localContactPhone" placeholder="Local Contact Phone" onChange={handleChange} />
      </div>

      {/* PHOTO */}
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Save Student
      </button>
    </form>
  );
}
