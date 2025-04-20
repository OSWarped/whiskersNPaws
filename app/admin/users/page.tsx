'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={() => router.push('/admin')}>
          ← Back to Admin Panel
        </button>
      </div>

      <h2 className="mb-4">User Management</h2>

      {loading ? (
        <div className="text-muted">Loading users...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Admin?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || '—'}</td>
                  <td>{user.isAdmin ? '✅' : '❌'}</td>
                  <td>
                    <a href={`/admin/users/${user.id}`} className="btn btn-sm btn-outline-primary">
                      View
                    </a>
                    {/* future: Promote/demote/delete buttons here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
