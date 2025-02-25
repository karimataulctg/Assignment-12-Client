import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async ({ queryKey }) => {
  const axiosSecure = queryKey[1];
  try {
    const res = await axiosSecure.get("/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users", axiosSecure],
    queryFn: fetchUsers,
  });

  const handleMakeModerator = (user) => {
    axiosSecure.patch(`/users/moderator/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is a Moderator Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Failed to make moderator', 'error');
        console.error('Error making moderator:', error);
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to delete user', 'error');
            console.error('Error deleting user:', error);
          });
      }
    });
  };

  if (isLoading) return <span className="loading loading-dots loading-lg"></span>;
  if (isError) return <p className="text-center text-red-500">Error loading users. Please try again later.</p>;

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center my-4">
        <h2 className="text-2xl text-center md:text-3xl font-bold">All Users</h2>
        <h2 className="text-lg md:text-2xl font-semibold">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto  shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-400 text-gray-700">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  {user.role === "moderator" ? (
                    "Moderator"
                  ) : (
                    <button
                      onClick={() => handleMakeModerator(user)}
                      className="btn btn-sm bg-orange-500 text-white px-3 py-1 rounded-md"
                    >
                      <FaUsers className="text-xl" />
                    </button>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
