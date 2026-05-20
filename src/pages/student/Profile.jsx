import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Home,
  Users,
  BadgeCheck,
} from "lucide-react";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/students/me");
      setStudent(res.data);
    } catch (err) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
          <div className="h-64 rounded-3xl bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-gray-400">
        No profile found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-10 pt-24 text-white md:px-8">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">

        {/* HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10">
                <User size={26} className="text-cyan-400" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {student.name}
                </h1>

                <p className="text-sm text-gray-400">
                  Student Profile Overview
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    {student.course}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-300">
                    Year {student.year}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT BADGE */}
            <div className="flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
              <BadgeCheck size={16} />
              Active Student
            </div>
          </div>
        </motion.div>

        {/* PROFILE GRID */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* STUDENT INFO */}
          <Section title="Student Information">

            <InfoRow icon={User} label="Name" value={student.name} />
            <InfoRow icon={BadgeCheck} label="Roll No" value={student.rollNo} />
            <InfoRow icon={GraduationCap} label="Course" value={student.course} />
            <InfoRow icon={Home} label="Branch" value={student.branch} />
            <InfoRow icon={Users} label="Section" value={student.section || "-"} />

            <InfoRow icon={Phone} label="Phone" value={student.studentPhone} />
            <InfoRow icon={Mail} label="Email" value={student.studentEmail} />
          </Section>

          {/* PARENT INFO */}
          <Section title="Parent Information">

            <InfoRow icon={User} label="Parent Name" value={student.parentName} />
            <InfoRow icon={Phone} label="Parent Phone" value={student.parentPhone} />
            <InfoRow icon={Mail} label="Parent Email" value={student.parentEmail || "-"} />

          </Section>
        </div>

        {/* ROOM INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
        >
          <h2 className="mb-4 text-lg font-semibold">
            Room Allocation
          </h2>

          {student.room ? (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300">
              <Home size={16} />
              Room {student.room.roomNumber}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-gray-400">
              Not Assigned
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default StudentProfile;

// =============================
// SECTION COMPONENT
// =============================
function Section({ title, children }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <h2 className="mb-6 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// =============================
// INFO ROW
// =============================
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-cyan-400" />

        <span className="text-sm text-gray-300">
          {label}
        </span>
      </div>

      <span className="text-sm font-medium text-white">
        {value}
      </span>
    </div>
  );
}