import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
  });

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const submitContact = async (e) => {
    e.preventDefault();

    if (!form.name || !form.designation || !form.phone || !form.email) {
      alert("All fields required");
      return;
    }

    await api.post("/contacts", form);

    setForm({
      name: "",
      designation: "",
      phone: "",
      email: "",
    });

    fetchContacts();
  };

  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-[#070B14] px-4 py-6 space-y-6 text-white">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Contact Directory
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Manage staff and hostel contact information
        </p>
      </div>

      {/* Add Contact Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <h2 className="text-lg font-semibold mb-4">
          Add New Contact
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitContact}>

          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) =>
              setForm({ ...form, designation: e.target.value })
            }
          />

          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-black hover:bg-cyan-400 transition"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>

      {/* Contacts Grid */}
      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No contacts available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {contacts.map((c) => (
            <div
              key={c._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-cyan-400/30 transition flex flex-col justify-between"
            >

              <div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold mb-4">
                  {c.name?.charAt(0)?.toUpperCase()}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {c.name}
                </h3>

                <p className="text-sm text-white/50 mt-1">
                  {c.designation}
                </p>

                <p className="text-sm text-white/60 mt-3">
                  📞 {c.phone}
                </p>

                <p className="text-sm text-white/60">
                  ✉ {c.email}
                </p>

              </div>

              <button
                onClick={() => deleteContact(c._id)}
                className="mt-6 text-sm text-red-400 hover:text-red-300 transition"
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Input Component */
function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-cyan-400/40 ${className}`}
    />
  );
}