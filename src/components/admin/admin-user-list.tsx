"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  surname: string;
  firstname: string;
}

const AdminUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/get-users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleApprove = async (userId: string) => {
    await fetch("/api/admin/approve-user", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    fetchUsers(); // refresh list
  };

  const handleReject = async (userId: string) => {
    await fetch("/api/admin/reject-user", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    fetchUsers(); // refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  if (users.length === 0) return <p>No users to validate ✅</p>;

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
          <div>
            <p className="font-semibold">{user.firstname} {user.surname}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleApprove(user.id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(user.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUserList;
