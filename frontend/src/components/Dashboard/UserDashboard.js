import React from "react";
import "./Dashboard.css";

function UserDashboard() {
  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="dashboard-content">
        <div className="card">
          <h3>Available Rooms</h3>
          <p>Details about available rooms will be displayed here.</p>
        </div>
        <div className="card">
          <h3>Book a Room</h3>
          <p>Room booking functionality will be provided here.</p>
        </div>
        <div className="card">
          <h3>Booking History</h3>
          <p>Past booking history will be available here.</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
