import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./styles/AdminDashboard.css";

const AdminHistory = () => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const donationsRes = await api.get("/admin/donations");
        const requestsRes = await api.get("/admin/requests");

        // Sort by most recent first (assuming _id contains descending timestamp or createdAt is present)
        const sortedDonations = (donationsRes.data || []).sort((a, b) => new Date(b.createdAt || b._id.getTimestamp?.() || 0) - new Date(a.createdAt || a._id.getTimestamp?.() || 0));
        const sortedRequests = (requestsRes.data || []).sort((a, b) => new Date(b.createdAt || b._id.getTimestamp?.() || 0) - new Date(a.createdAt || a._id.getTimestamp?.() || 0));

        setDonations(sortedDonations);
        setRequests(sortedRequests);
      } catch (error) {
        console.error("Error fetching admin history data:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin History Log</h1>
      </div>
      
      <div className="users-section">
        <h2>Donation History</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date</th>
              <th>Cancel Reason</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.donorId?.name || "Anonymous"}</td>
                <td>{donation.quantity} kg</td>
                <td><span className={`status-badge ${donation.status}`}>{donation.status}</span></td>
                <td>{donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : "Unknown"}</td>
                <td style={{ color: "red" }}>{donation.cancelReason || "-"}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="5">No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="users-section">
        <h2>Request History</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date</th>
              <th>Cancel Reason</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.receiverName || "Unknown"}</td>
                <td>{request.quantity} kg</td>
                <td><span className={`status-badge ${request.status}`}>{request.status || "pending"}</span></td>
                <td>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "Unknown"}</td>
                <td style={{ color: "red" }}>{request.cancelReason || "-"}</td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHistory;
