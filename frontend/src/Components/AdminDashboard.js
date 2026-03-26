import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import api from "../api/axios";
import "./styles/AdminDashboard.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalDonations: 0,
    totalRequests: 0,
    totalUsers: 0,
  });
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [chartData, setChartData] = useState({ pie: null, line: null });

  const fetchData = async () => {
    try {
      const donationsRes = await api.get("/admin/donations");
      const requestsRes = await api.get("/admin/requests");
      const usersRes = await api.get("/admin/users");
      const metricsRes = await api.get("/metrics");

      setDonations(donationsRes.data || []);
      setRequests(requestsRes.data || []);
      setMetrics(metricsRes.data || { totalDonations: 0, totalRequests: 0, totalUsers: 0 });
      
      // Prepare Pie Data
      const statusCounts = metricsRes.data?.statusCounts || [];
      setChartData({
        pie: {
          labels: statusCounts.map(s => s._id),
          datasets: [{
            data: statusCounts.map(s => s.count),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
          }]
        },
        line: {
          labels: (metricsRes.data.donationsPerDay || []).map(d => d._id),
          datasets: [{
            label: "Donations",
            data: (metricsRes.data.donationsPerDay || []).map(d => d.count),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          }]
        }
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (id, type) => {
    const reason = prompt(`Enter reason for cancelling this ${type}:`);
    if (!reason) return;

    try {
      const endpoint = type === 'donation' ? '/admin/donations/cancel' : '/admin/requests/cancel';
      const payload = type === 'donation' ? { donationId: id, reason } : { requestId: id, reason };
      await api.post(endpoint, payload);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} cancelled successfully`);
      fetchData();
    } catch (error) {
      alert("Failed to cancel: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h2>Total Donations</h2>
          <p>{metrics.totalDonations}</p>
        </div>
        <div className="metric-card">
          <h2>Total Requests</h2>
          <p>{metrics.totalRequests}</p>
        </div>
        <div className="metric-card">
          <h2>Total Users</h2>
          <p>{metrics.totalUsers}</p>
        </div>
      </div>
      <div className="chart-section">
        <h2>Real-time Statistics</h2>
        <div className="chart-wrapper">
          <h3>Donations by Status</h3>
          {chartData.pie && <Pie data={chartData.pie} />}
        </div>
        <div className="chart-wrapper">
          <h3>Donations Timeline (Last 7 Days)</h3>
          {chartData.line && <Line data={chartData.line} />}
        </div>
      </div>
      <div className="users-section">
        <h2>Donations Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.donorId?.name || "Anonymous"}</td>
                <td>{donation.quantity}</td>
                <td><span className={`status-badge ${donation.status}`}>{donation.status}</span></td>
                <td>
                  {donation.status !== 'cancelled' && (
                    <button className="btn-cancel" onClick={() => handleCancel(donation._id, 'donation')}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-section">
        <h2>Requests Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.receiverName}</td>
                <td>{request.quantity}</td>
                <td><span className={`status-badge ${request.status}`}>{request.status || 'pending'}</span></td>
                <td>
                  {request.status !== 'cancelled' && (
                    <button className="btn-cancel" onClick={() => handleCancel(request._id, 'request')}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;