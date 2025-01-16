import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const subscriptionAmount = "20 USD"; // This can be dynamic based on your logic

  const handleSubscribe = () => {
    Swal.fire({
      title: 'Subscribe',
      text: `Do you want to subscribe for ${subscriptionAmount}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, subscribe',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to payment page or show modal
        Swal.fire('Subscribed!', 'You have been subscribed.', 'success');
      }
    });
  };

  return (
    <div className="profile-page flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="card w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        {user ? (
          <>
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="rounded-full w-32 h-32 mx-auto mb-4" />
            ) : (
              <div className="rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-gray-600">
                  {user.displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <p className="text-lg font-semibold">Name: {user.displayName}</p>
            <p className="text-lg font-semibold mb-4">Email: {user.email}</p>
            {user.subscriptionStatus !== 'subscribed' ? (
              <button onClick={handleSubscribe} className="btn btn-primary w-full mb-2">
                Subscribe {subscriptionAmount}
              </button>
            ) : (
              <p className="text-green-500 text-lg font-semibold">Status: Verified</p>
            )}
          </>
        ) : (
          <p className="text-center text-lg font-semibold">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
