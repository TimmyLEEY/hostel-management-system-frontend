// ==========================================
// PREMIUM LOGIN PAGE — React + Tailwind CSS
// Built like a modern SaaS auth experience
// Recommended Libraries:
// npm install framer-motion lucide-react clsx
// ==========================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { loginUser } from "../../services/auth";
import logo from "../../assets/24f27772-f206-492d-8428-60a347a88aee.jpeg";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "STUDENT",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res.data.role === "ADMIN") {
        localStorage.setItem("adminToken", res.data.token);
      } else {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      else if (res.data.role === "STUDENT") navigate("/student");
      else if (res.data.role === "PARENT") navigate("/parent");
      else navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login.");
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
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Glow Effects */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex w-1/2 flex-col justify-between border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl p-12"
        >
          <div>
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
                  Premium Hostel Management Platform
                </p>
              </div>
            </div>

            <div className="mt-24 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
                <ShieldCheck size={16} />
                Secure Student Infrastructure
              </div>

              <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight">
                Simplifying hostel operations with a modern digital experience.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Built for students, parents, and administrators with enterprise-
                level UX and seamless accessibility.
              </p>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              ["99.9%", "Uptime"],
              ["10k+", "Students"],
              ["24/7", "Support"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold">{value}</h3>
                <p className="mt-1 text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-12 rounded-xl"
              />

              <div>
                <h2 className="text-lg font-semibold">SITERYX HMS</h2>
                <p className="text-xs text-gray-400">
                  Hostel Management System
                </p>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back
                </h1>

                <p className="mt-2 text-gray-400">
                  Login to continue managing your hostel experience.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* ROLE */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Continue as
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-white outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                  >
                    <option value="STUDENT" className="bg-black">
                      Student
                    </option>
                    <option value="PARENT" className="bg-black">
                      Parent
                    </option>
                    <option value="ADMIN" className="bg-black">
                      Admin
                    </option>
                  </select>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition group-focus-within:text-cyan-400"
                    />

                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition group-focus-within:text-cyan-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-12 pr-14 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-white/20 bg-transparent text-cyan-500 focus:ring-cyan-500"
                    />

                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-cyan-400 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* LOGIN BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={loading}
                  className={clsx(
                    "group flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300",
                    "bg-gradient-to-r from-cyan-500 to-blue-600",
                    "shadow-lg shadow-cyan-500/20",
                    "hover:shadow-cyan-500/40",
                    loading && "cursor-not-allowed opacity-70"
                  )}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Login
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>

                {/* DIVIDER */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-[#0B1120] px-4 text-sm text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* SOCIALS */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:bg-white/[0.06]"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="h-5 w-5"
                    />

                    Google
                  </button>

                  <button
                    type="button"
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:bg-white/[0.06]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 008 10.938c.6.112.82-.262.82-.582 0-.287-.01-1.046-.016-2.053-3.252.707-3.938-1.567-3.938-1.567-.532-1.35-1.298-1.71-1.298-1.71-1.06-.725.08-.71.08-.71 1.172.082 1.788 1.203 1.788 1.203 1.04 1.782 2.728 1.267 3.392.968.105-.754.407-1.268.74-1.56-2.596-.295-5.325-1.298-5.325-5.778 0-1.276.455-2.32 1.2-3.138-.12-.296-.52-1.486.113-3.098 0 0 .98-.314 3.21 1.2A11.18 11.18 0 0112 6.095c.99.005 1.987.134 2.92.393 2.228-1.514 3.206-1.2 3.206-1.2.635 1.612.235 2.802.116 3.098.748.818 1.198 1.862 1.198 3.138 0 4.49-2.733 5.48-5.337 5.77.418.36.79 1.096.79 2.21 0 1.595-.015 2.882-.015 3.274 0 .323.216.7.825.58A11.502 11.502 0 0023.5 12C23.5 5.648 18.352.5 12 .5z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                {/* REGISTER */}
                <p className="pt-2 text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="cursor-pointer font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Create account
                  </span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}