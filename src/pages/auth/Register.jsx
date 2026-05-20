// ==========================================
// PREMIUM ADMIN REGISTER PAGE
// React + Tailwind + Framer Motion
// ==========================================

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

import logo from "../../assets/24f27772-f206-492d-8428-60a347a88aee.jpeg";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD STRENGTH
  const getPasswordStrength = () => {
    const password = formData.password;

    if (password.length < 6) {
      return {
        text: "Weak",
        width: "w-1/4",
        color: "bg-red-500",
      };
    }

    if (password.length < 10) {
      return {
        text: "Medium",
        width: "w-2/4",
        color: "bg-yellow-500",
      };
    }

    return {
      text: "Strong",
      width: "w-full",
      color: "bg-green-500",
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://hostel-management-system-backend-9ar8.onrender.com/api/auth/register-admin",
        formData
      );

      localStorage.setItem("adminToken", data.token);

      setSuccess("Admin account created successfully.");

      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Admin registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Glows */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex w-1/2 flex-col justify-between border-r border-white/10 bg-white/[0.03] p-12 backdrop-blur-2xl"
        >
          <div>
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10"
              />

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  SITERYX HMS
                </h1>

                <p className="text-sm text-gray-400">
                  Enterprise Hostel Infrastructure
                </p>
              </div>
            </div>

            {/* HERO */}
            <div className="mt-24 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
                <Shield size={16} />
                Protected Admin Environment
              </div>

              <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
                Create a secure admin workspace for your institution.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Manage hostel operations, student records, payments,
                room allocations, and analytics with a premium
                management experience.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            {[
              ["256-bit", "Encryption"],
              ["99.9%", "Reliability"],
              ["24/7", "Monitoring"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold">{value}</h3>

                <p className="mt-1 text-sm text-gray-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* MOBILE LOGO */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-12 rounded-xl"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  SITERYX HMS
                </h2>

                <p className="text-xs text-gray-400">
                  Hostel Management System
                </p>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  Create Admin Account
                </h1>

                <p className="mt-2 text-gray-400">
                  Setup your secure administrator workspace.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="mb-6 flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 size={18} />
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>

                  <div className="group relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400"
                    />

                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400"
                    />

                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="admin@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Password
                  </label>

                  <div className="group relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400"
                    />

                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create secure password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-14 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {/* PASSWORD STRENGTH */}
                  <div className="mt-3">
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full ${strength.width} ${strength.color} transition-all duration-500`}
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      Password Strength: {strength.text}
                    </p>
                  </div>
                </div>

                {/* SECRET */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Admin Secret Key
                  </label>

                  <div className="group relative">
                    <Shield
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400"
                    />

                    <input
                      name="secret"
                      type={showSecret ? "text" : "password"}
                      required
                      placeholder="Enter admin secret key"
                      value={formData.secret}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-14 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowSecret(!showSecret)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                    >
                      {showSecret ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Create Admin Account

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>

                {/* LOGIN */}
                <p className="pt-2 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="cursor-pointer font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;