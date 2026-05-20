import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Phone, Mail, User, BadgeInfo } from "lucide-react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contacts");
        setContacts(res.data);
      } catch (err) {
        console.error("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-20 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
        </div>
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

      <div className="relative z-10 space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-cyan-500/10 p-3">
              <User size={20} className="text-cyan-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Contact Directory
              </h1>

              <p className="text-sm text-gray-400">
                Important hostel staff and emergency contacts
              </p>
            </div>
          </div>
        </motion.div>

        {/* EMPTY STATE */}
        {contacts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-gray-400">
            No contact details available
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {contacts.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition hover:border-cyan-500/20 hover:bg-white/[0.08]"
              >

                {/* NAME */}
                <h3 className="text-lg font-semibold text-white">
                  {c.name}
                </h3>

                {/* DESIGNATION */}
                {c.designation && (
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                    <BadgeInfo size={12} />
                    {c.designation}
                  </div>
                )}

                {/* CONTACTS */}
                <div className="mt-5 space-y-3 text-sm">

                  {/* PHONE */}
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-2 text-gray-300 transition hover:text-cyan-400"
                    >
                      <Phone size={14} />
                      {c.phone}
                    </a>
                  )}

                  {/* EMAIL */}
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-gray-300 transition hover:text-cyan-400"
                    >
                      <Mail size={14} />
                      {c.email}
                    </a>
                  )}
                </div>

                {/* FOOTER ACCENT */}
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}