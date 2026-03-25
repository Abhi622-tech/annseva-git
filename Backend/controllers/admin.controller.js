const errorHandler = require("express-async-handler");
const Donation = require("../models/donation.model");
const User = require("../models/user.model");
const Request = require("../models/request.model");

const getAllDonations = errorHandler(async (req, res) => {
  try {
    const donations = await Donation.find().populate("donorId", "name phone email");
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Error fetching donations" });
  }
});

const getAllRequests = errorHandler(async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

const getAllUsers = errorHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

const cancelDonation = errorHandler(async (req, res) => {
  const { donationId, reason } = req.body;
  try {
    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "cancelled";
    donation.cancelReason = reason;
    donation.cancelledBy = req.user.id;
    await donation.save();

    res.status(200).json({ success: true, message: "Donation cancelled successfully", donation });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling donation", error: error.message });
  }
});

const cancelRequest = errorHandler(async (req, res) => {
  const { requestId, reason } = req.body;
  try {
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "cancelled";
    request.cancelReason = reason;
    request.isActive = false;
    await request.save();

    res.status(200).json({ success: true, message: "Request cancelled successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling request", error: error.message });
  }
});

module.exports = {
  getAllDonations,
  getAllRequests,
  getAllUsers,
  cancelDonation,
  cancelRequest,
};
