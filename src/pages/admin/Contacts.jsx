// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function AdminContacts() {
//   const [contacts, setContacts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     designation: "",
//     phone: "",
//     email: "",
//   });

//   const fetchContacts = async () => {
//     const res = await api.get("/contacts");
//     setContacts(res.data);
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const submitContact = async (e) => {
//     e.preventDefault();

//     if (
//       !form.name ||
//       !form.designation ||
//       !form.phone ||
//       !form.email
//     ) {
//       alert("All fields required");
//       return;
//     }

//     await api.post("/contacts", form);
//     setForm({
//       name: "",
//       designation: "",
//       phone: "",
//       email: "",
//     });
//     fetchContacts();
//   };

//   const deleteContact = async (id) => {
//     await api.delete(`/contacts/${id}`);
//     fetchContacts();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-orange-500 mb-6">
//         Contact Details
//       </h1>

//       <form
//         onSubmit={submitContact}
//         className="bg-white p-4 rounded shadow mb-6 space-y-3"
//       >
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           placeholder="Designation"
//           value={form.designation}
//           onChange={(e) =>
//             setForm({ ...form, designation: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           placeholder="Phone"
//           value={form.phone}
//           onChange={(e) =>
//             setForm({ ...form, phone: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//           className="w-full border px-3 py-2 rounded"
//         />

//         <button className="bg-green-600 text-white px-4 py-2 rounded">
//           Add Contact
//         </button>
//       </form>

//       <div className="space-y-4">
//         {contacts.map((c) => (
//           <div
//             key={c._id}
//             className="bg-white p-4 rounded border"
//           >
//             <p className="font-semibold">{c.name}</p>
//             <p className="text-sm">{c.designation}</p>
//             <p className="text-sm">{c.phone}</p>
//             <p className="text-sm">{c.email}</p>

//             <button
//               onClick={() => deleteContact(c._id)}
//               className="text-red-600 text-xs mt-2"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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

    if (
      !form.name ||
      !form.designation ||
      !form.phone ||
      !form.email
    ) {
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
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Contact Directory
      </h1>

      {/* Add Contact Card */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Contact
        </h2>

        <form
          onSubmit={submitContact}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
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
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>

      {/* Contacts Grid */}
      {contacts.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No contacts available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                  {c.name.charAt(0).toUpperCase()}
                </div>

                <h3 className="font-semibold text-lg text-gray-800">
                  {c.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {c.designation}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  📞 {c.phone}
                </p>

                <p className="text-sm text-gray-600">
                  ✉ {c.email}
                </p>
              </div>

              <button
                onClick={() => deleteContact(c._id)}
                className="mt-6 text-sm text-red-600 hover:text-red-700 font-medium"
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

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
    />
  );
}