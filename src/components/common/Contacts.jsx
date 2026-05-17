// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function Contacts() {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     api.get("/contacts").then((res) => setContacts(res.data));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-blue-700 mb-6">
//         Contact Details
//       </h1>

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
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

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

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Contact Directory
      </h1>

      {contacts.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-soft text-center text-gray-400">
          No contact details available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {c.name}
              </h3>

              {c.designation && (
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  {c.designation}
                </span>
              )}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {c.phone && (
                  <p>
                    📞{" "}
                    <a
                      href={`tel:${c.phone}`}
                      className="hover:text-primary transition"
                    >
                      {c.phone}
                    </a>
                  </p>
                )}

                {c.email && (
                  <p>
                    ✉️{" "}
                    <a
                      href={`mailto:${c.email}`}
                      className="hover:text-primary transition"
                    >
                      {c.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}