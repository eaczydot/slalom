import React from 'react';
import '../styles/Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>John Doe</h2>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
          </div>
        </div>
        <div className="shareholding-info">
          <h2>Shareholding Information</h2>
          <p><strong>Total Shares:</strong> 100,000</p>
          <p><strong>Percentage Ownership:</strong> 10%</p>
          <p><strong>Share Class:</strong> Common</p>
        </div>
      </div>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
}

export default Profile;