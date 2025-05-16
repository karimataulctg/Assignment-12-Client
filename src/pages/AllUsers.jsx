import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// ... keep fetchUsers and other existing code ...
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
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-xl md:text-3xl font-bold">All Users</h2>
        <h2 className="text-base md:text-xl font-semibold">
          Total Users: {users.length}
        </h2>
      </div>

      <div className="overflow-x-auto md:shadow-md rounded-lg hidden md:block">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm md:text-base">
              <th className="p-2 text-left hidden md:table-cell">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left hidden md:table-cell">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-2 hidden md:table-cell">{index + 1}</td>
                <td className="p-2 text-sm md:text-base">{user.name}</td>
                <td className="p-2 text-sm md:text-base hidden md:table-cell">
                  {user.email}
                </td>
                <td className="p-2">
                  {user.role === "moderator" ? (
                    <span className="bg-green-100 text-green-800 text-xs md:text-sm px-2 py-1 rounded">
                      Moderator
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeModerator(user)}
                      className="btn btn-sm bg-orange-500 text-white p-1 md:px-3 md:py-2 rounded-md"
                      aria-label="Make moderator"
                    >
                      <FaUsers className="text-lg md:text-xl" />
                      <span className="hidden md:inline ml-1">Make Mod</span>
                    </button>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-red-600 text-white p-1 md:px-3 md:py-2 rounded-md"
                    aria-label="Delete user"
                  >
                    <FaTrashAlt className="text-sm md:text-base" />
                    <span className="hidden md:inline ml-1">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Mobile Card View */}
<div className="md:hidden space-y-3 mt-4">
  {users.map((user, index) => (
    <div key={user._id} className="bg-white p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-sm">{user.name}</h3>
          <p className="text-xs text-gray-600 truncate">{user.email}</p>
        </div>
        <div className="text-xs text-gray-500 ml-2">#{index + 1}</div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <div className="flex-1">
          {user.role === "moderator" ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Moderator
            </span>
          ) : (
            <button
              onClick={() => handleMakeModerator(user)}
              className="bg-orange-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
            >
              <FaUsers className="mr-1 text-sm" />
              Make Mod
            </button>
          )}
        </div>
        <button
          onClick={() => handleDeleteUser(user)}
          className="bg-red-600 text-white px-2 py-1 rounded-md flex items-center text-xs ml-2"
        >
          <FaTrashAlt className="mr-1 text-sm" />
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      {isLoading && (
        <div className="text-center my-8">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      
      {isError && (
        <p className="text-center text-red-500 my-4">
          Error loading users. Please try again later.
        </p>
      )}
    </div>
  );
};

export default AllUsers;