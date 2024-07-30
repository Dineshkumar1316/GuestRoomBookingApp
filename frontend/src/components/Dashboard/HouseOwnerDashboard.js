import React from "react";
import "./Dashboard.css";

function HouseOwnerDashboard() {
  return (
    <div className="dashboard">
      <h2>House Owner Dashboard</h2>
      <div className="dashboard-content">
        <div className="card">
          <h3>Edit Room Details</h3>
          <p>Edit and update room information here.</p>
        </div>
        <div className="card">
          <h3>Add New Room</h3>
          <p>Add new room details for availability.</p>
        </div>
        <div className="card">
          <h3>Delete Room</h3>
          <p>Remove room details when not available.</p>
        </div>
        <div className="card">
          <h3>Manage Bookings</h3>
          <p>Handle and review all bookings here.</p>
        </div>
      </div>
    </div>
  );
}

export default HouseOwnerDashboard;
