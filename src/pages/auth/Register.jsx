import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secret: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://hostel-management-system-backend-9ar8.onrender.com/api/auth/register-admin",
        formData
      );

      localStorage.setItem("adminToken", data.token);
      navigate("/admin");

    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Registration
        </h2>

        <input
          name="name"
          placeholder="Admin Name"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />

        <input
          name="secret"
          type="password"
          placeholder="Admin Secret Key"
          className="w-full border p-2 mb-2"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
};

export default Register;