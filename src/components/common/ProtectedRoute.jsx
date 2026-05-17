import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



// export default function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token =
    allowedRoles.includes("ADMIN")
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;