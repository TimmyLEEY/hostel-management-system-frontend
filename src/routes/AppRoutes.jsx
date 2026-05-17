import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Dashboards */
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import ParentDashboard from "../pages/parent/Dashboard";

/*Route Protection*/
import ProtectedRoute from "../components/common/ProtectedRoute";

/* Layouts */
import AdminLayout from "../components/layout/AdminLayout";
import StudentLayout from "../components/layout/StudentLayout";
import ParentLayout from "../components/layout/ParentLayout";

/* Complaints */
import StudentComplaints from "../pages/student/Complaints";
import AdminComplaints from "../pages/admin/Complaints";

/* Permissions */
import StudentPermissions from "../pages/student/Permissions";
import AdminPermissions from "../pages/admin/Permissions";
import ParentPermissions from "../pages/parent/Permissions";

/* Notices */
import AdminNotices from "../pages/admin/Notices";
import Notices from "../components/common/Notices";

/* Contacts */
import AdminContacts from "../pages/admin/Contacts";
import Contacts from "../components/common/Contacts";

/* Admin Students */
import AdminStudents from "../pages/admin/Students";
import StudentDetail from "../pages/admin/StudentDetail";
import EditStudents from "../pages/admin/EditStudent";
import AdminRooms from "../pages/admin/Rooms";
import AddStudent from "../pages/admin/AddStudent";
import Profile from "../pages/student/Profile";




export default function AppRoutes() {
  return (
    <><Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="complaints" element={<AdminComplaints />} />
  <Route path="permissions" element={<AdminPermissions />} />
  <Route path="notices" element={<AdminNotices />} />
  <Route path="contacts" element={<AdminContacts />} />

  <Route path="students" element={<AdminStudents />} />
  <Route path="students/:id" element={<StudentDetail />} />
  <Route path="students/:id/edit" element={<EditStudents />} />
  <Route path="students/add" element={<AddStudent />} />

  <Route path="rooms" element={<AdminRooms />} />
</Route>
      


      {/* Student */}
      <Route
  path="/student"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <StudentLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<StudentDashboard />} />
  <Route path="complaints" element={<StudentComplaints />} />
  <Route path="permissions" element={<StudentPermissions />} />
  <Route path="notices" element={<Notices />} />
  <Route path="contacts" element={<Contacts />} />
  <Route path="profile" element={<Profile/>} />
</Route>


      {/* Parent */}
    <Route
  path="/parent"
  element={
    <ProtectedRoute allowedRoles={["PARENT"]}>
      <ParentLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<ParentDashboard />} />
  <Route path="permissions" element={<ParentPermissions />} />
  <Route path="notices" element={<Notices />} />
  <Route path="contacts" element={<Contacts />} />
</Route>

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </>

  );
}
