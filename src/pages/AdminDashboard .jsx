import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAdmin from '../hooks/useAdmin';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, error] = useAdmin();

  useEffect(() => {
    if (!isAdmin) {
      Swal.fire('Error', 'Unauthorized access', 'error');
      navigate('/');
      return;
    }

    fetch('http://localhost:5000/users', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }, [isAdmin, navigate]);

  const handlePromote = (email) => {
    fetch('http://localhost:5000/users/assign-moderator', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire('Success', 'User promoted to Moderator', 'success');
        setUsers(users.map((user) => (user.email === email ? { ...user, role: 'moderator' } : user)));
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div className="admin-page min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="table w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.email} className="border-b">
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">
                    {user.role !== 'moderator' && (
                      <button onClick={() => handlePromote(user.email)} className="btn btn-sm btn-primary">
                        Make Moderator
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2 px-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
