import React from "react";
import "./styles/History.css";

const HistoryCard = ({ donation = {} }) => {
  // Safely destructure donation object with defaults
  const {
    donationDetails = {},
    donationId = "Unknown ID",
    donor = { name: "Unknown Donor", phone: "N/A", location: { landmark: "N/A" } },
    receiver = { name: "Unknown Receiver", phone: "N/A", location: { landmark: "N/A" } },
    volunteer = { name: "No details available", phone: "N/A", location: { landmark: "N/A" } }, // Default message if no volunteer info
  } = donation;

  const {
    quantity = "N/A",
    status = "Status unavailable",
    location = { landmark: "N/A", lat: "N/A", long: "N/A" },
    createdAt = null,
    cancelReason = "",
  } = donationDetails;

  const landmark = location?.landmark || "N/A";

  return (
    <div className={`history-card ${status}`}>
      <div className="card-section">
        <h3>Donor:</h3>
        <p><span>Name:</span> {donor?.name || "Unknown Donor"}</p>
        <p><span>Phone:</span> {donor?.phone || "N/A"}</p>
        <p><span>Location:</span> {donor?.location?.landmark || "N/A"}</p>
      </div>

      <div className="card-section">
        <h3>Receiver:</h3>
        <p><span>Name:</span> {receiver?.name || "Unknown Receiver"}</p>
        <p><span>Phone:</span> {receiver?.phone || "N/A"}</p>
        <p><span>Location:</span> {receiver?.location?.landmark || "N/A"}</p>
      </div>

      <div className="card-section">
        <h3>Donation Details:</h3>
        <p><span>Quantity:</span> {quantity} kg</p>
        <p><span>Status:</span> <span className={`status-text ${status}`}>{status}</span></p>
        <p><span>Location:</span> {landmark} </p>
        <p><span>Date:</span> {createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown"}</p>
        {cancelReason && (
          <p className="cancel-reason"><span>Reason:</span> {cancelReason}</p>
        )}
      </div>

      <div className="card-section">
        <h3>Volunteer:</h3>
        <p><span>Name:</span> {volunteer?.name || "No volunteer assigned"}</p>
        <p><span>Phone:</span> {volunteer?.phone || "N/A"}</p>
        <p><span>Location:</span> {volunteer?.location?.landmark || "N/A"}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
