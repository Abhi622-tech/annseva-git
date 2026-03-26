const express = require("express");
const {
  getAllDonations,
  getAllRequests,
  getAllUsers,
  cancelDonation,
  cancelRequest,
  approveDonation,
  approveRequest,
  assignVolunteerAdmin,
  completeDonationAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/donations", getAllDonations);
router.get("/requests", getAllRequests);
router.get("/users", getAllUsers);
router.post("/donations/cancel", cancelDonation);
router.post("/requests/cancel", cancelRequest);
router.post("/donations/approve", approveDonation);
router.post("/requests/approve", approveRequest);
router.post("/donations/assign", assignVolunteerAdmin);
router.post("/donations/complete", completeDonationAdmin);

module.exports = router;
