const express = require("express");
const {
  getAllDonations,
  getAllRequests,
  getAllUsers,
  cancelDonation,
  cancelRequest,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/donations", getAllDonations);
router.get("/requests", getAllRequests);
router.get("/users", getAllUsers);
router.post("/donations/cancel", cancelDonation);
router.post("/requests/cancel", cancelRequest);

module.exports = router;
