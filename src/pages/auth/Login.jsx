import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import logo from "../../assets/ChatGPT Image May 17, 2026, 10_04_15 PM.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STUDENT", // ✅ DEFAULT ROLE
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ ROLE IS NOW SENT
      const res = await loginUser(form);

      // Save auth details
      if (res.data.role === "ADMIN") {
        localStorage.setItem("adminToken", res.data.token);
      } else {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "ADMIN") navigate("/admin");
      else if (res.data.role === "STUDENT") navigate("/student");
      else if (res.data.role === "PARENT") navigate("/parent");
      else navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="College Logo" className="h-20 mb-3" />
          <h1 className="text-xl font-bold text-blue-700 text-center">
            SITERYX College of ICT
          </h1>
          <p className="text-sm text-gray-500 mt-1">Hostel Management System</p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ROLE SELECTOR */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Login as
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="STUDENT">Student</option>
              <option value="PARENT">Parent</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
