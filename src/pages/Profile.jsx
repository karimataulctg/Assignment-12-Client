import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState(user?.subscriptionStatus || "");

  useEffect(() => {
    setSubscriptionStatus(user?.subscriptionStatus || "");
  }, [user]);

  const subscriptionAmount = "20 USD"; 

  const handleSubscribe = () => {
    Swal.fire({
      title: "Subscribe",
      text: `Do you want to subscribe for ${subscriptionAmount}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, subscribe",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://product-hunt-server-two.vercel.app/users/subscribe/${user._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "User subscription status updated successfully") {
              Swal.fire("Subscribed!", "You have been subscribed.", "success");
              setSubscriptionStatus("verified"); 
            }
          })
          .catch((error) => {
            console.error("Subscription error:", error);
            Swal.fire("Error!", "Subscription failed. Try again.", "error");
          });
      }
    });
  };

  return (
    <div className="profile-page flex flex-col items-center min-h-screen  p-6">
      <div className="card w-full max-w-2xl  p-6 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg text-white text-center mb-6">
          <h1 className="text-3xl font-bold">Profile Page</h1>
          <p className="text-sm opacity-80">Manage your account and subscription</p>
        </div>

        {user ? (
          <>
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="rounded-full w-32 h-32 border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-600 border-4 border-gray-400 shadow-lg">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* User Info */}
              <h2 className="text-2xl font-semibold mt-4">{user.displayName}</h2>
              <p className="text-lg">{user.email}</p>
            </div>

            {/* Subscription Section */}
            <div className="mt-6 border-2 p-4 rounded-lg shadow-md w-full text-center">
              {subscriptionStatus !== "verified" ? (
                <div>
                  <p className="card text-lg mb-2">Subscribe to unlock premium features!</p>
                  <button
                    onClick={handleSubscribe}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md"
                  >
                    Subscribe for {subscriptionAmount}
                  </button>
                </div>
              ) : (
                <p className="text-green-500 text-lg font-semibold">✅ Subscription Status: Verified</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-600">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
