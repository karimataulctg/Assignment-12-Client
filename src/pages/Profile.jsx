import { useContext } from 'react';
// import { AuthContext } from '../AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider';

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
    <div className="profile-page">
      <h1>Profile Page</h1>
      <img src={user.photoURL} alt={user.displayName} />
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      {user.subscriptionStatus !== 'subscribed' && (
        <button onClick={handleSubscribe} className="btn">
          Subscribe {subscriptionAmount}
        </button>
      )}
      {user.subscriptionStatus === 'subscribed' && (
        <p>Status: Verified</p>
      )}
    </div>
  );
};

export default Profile;
