import { useUsers } from "../context/UsersContext";
import { Link } from "react-router-dom";

export default function Users() {
  const { users } = useUsers();

  return (
    <div className="space-y-10 p-6 ">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white/10 backdrop-blur-lg rounded-xl border border-white/10">
          <thead>
            <tr className="border-b border-white/10 text-indigo-200">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Days Clean</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      user.status === "Recovered"
                        ? "bg-green-400/20 text-green-300"
                        : "bg-red-400/20 text-red-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">{user.days}</td>
                <td className="p-4">
                  <Link
                    to={`/users/${user.id}`}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
