import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DonateForm from "./DonateForm";
import "./styles/Donor.css";

const ActiveRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [currentDonationData, setCurrentDonationData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/donation/getDonations");
        setRequests(response.data.requests || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setFetchError("Failed to fetch active requests.");
      }
    };
    fetchData();
  }, []);

  const handleDonateClick = (data) => {
    setCurrentDonationData(data);
    setShowDonateForm(true);
  };

  return (
    <div className="active-requests-page" style={{ padding: "20px" }}>
      <h2>Active Food Requests</h2>
      {fetchError && <p className="error">{fetchError}</p>}
      <div className="requests-container">
        <ul>
          {requests.map((item) => (
            <li key={item._id} className="request" style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
              <h4>{item.receiverName}</h4>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Phone:</strong> {item.receiverPhone}</p>
              <p><strong>Address:</strong> {item.receiverAddress}</p>
              <p><strong>Requested At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              <button className="btn btn-primary" onClick={() => handleDonateClick(item)}>Donate Now</button>
            </li>
          ))}
          {requests.length === 0 && !fetchError && <p>No active requests found.</p>}
        </ul>
      </div>

      {showDonateForm && (
        <DonateForm
          receiverId={currentDonationData.receiverId}
          setShowForm={setShowDonateForm}
          quantity={quantity}
          setQuantity={setQuantity}
          requestId={currentDonationData._id}
          isOrganisation={false}
          orgID={null}
        />
      )}
    </div>
  );
};

export default ActiveRequestsPage;
