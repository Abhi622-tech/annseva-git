const Donation = require("../models/donation.model");
const ReceiverRequest = require("../models/request.model");
const User = require("../models/user.model");

const volunteer = async (req, res) => {
  try {
    const donations = await Donation.find({ needVolunteer: true }).populate([
      { path: "donorId", select: "name phone location" },
    ]);

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: "No donations require a volunteer." });
    }

    const response = await Promise.all(
      donations.map(async (donation) => {
        let receiverDetails = null;

        if (donation.receiverId) {
          const receiver = await User.findById(donation.receiverId).select("name phone location");
          if (receiver) {
            receiverDetails = {
              name: receiver.name,
              phone: receiver.phone,
              location: receiver.location,
            };
          }
        }

        return {
          donationId: donation._id,
          donor: donation.donorId
            ? {
                name: donation.donorId.name,
                phone: donation.donorId.phone,
                location: donation.donorId.location,
              }
            : "Donor information unavailable",
          receiver: receiverDetails || "Receiver information unavailable",
          donationDetails: {
            quantity: donation.quantity,
            status: donation.status,
            shelfLife: donation.shelfLife,
            location: donation.location,
            pictureUrl: donation.pictureUrl,
            createdAt: donation.createdAt,
          },
        };
      })
    );

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching volunteer data:", err);
    res.status(500).json({ error: err.message });
  }
};

const getCurrentAcceptedDonation = async (req, res) => {
  const volunteerId = req.user.id;

  try {
    const donation = await Donation.findOne({
      status: "requestacceptedbyvolunteer",
      volunteerId: volunteerId,
    });

    if (!donation) {
      return res.status(404).json({ message: "No currently accepted donations found." });
    }

    const donorDetails = await User.findById(donation.donorId).select("name phone location");

    let receiverDetails = null;

    if (donation.receiverId) {
      const receiverRequest = await ReceiverRequest.findById(donation.receiverId)
        .populate("receiverId", "name phone location")
        .select("receiverId");

      if (receiverRequest && receiverRequest.receiverId) {
        receiverDetails = {
          name: receiverRequest.receiverId.name,
          phone: receiverRequest.receiverId.phone,
          location: receiverRequest.receiverId.location,
        };
      } else {
        const organization = await User.findById(donation.receiverId).select("name phone location");
        if (organization) {
          receiverDetails = {
            name: organization.name,
            phone: organization.phone,
            location: organization.location,
          };
        }
      }
    }

    res.status(200).json({
      donation: {
        id: donation._id,
        status: donation.status,
        location: donation.location || {},
        donor: donorDetails
          ? {
              name: donorDetails.name,
              phone: donorDetails.phone,
              location: donorDetails.location,
            }
          : "Donor information unavailable",
        receiver: receiverDetails || "Receiver information unavailable",
      },
    });
  } catch (err) {
    console.error("Error fetching current accepted donation:", err);
    res.status(500).json({ error: "Failed to fetch current accepted donation." });
  }
};

const acceptDonationByVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findByIdAndUpdate(
      id,
      {
        status: "requestacceptedbyvolunteer",
        needVolunteer: false,
        volunteerId: req.user.id,
      },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    res.status(200).json({ message: "Donation accepted successfully.", donation });
  } catch (err) {
    console.error("Error accepting donation:", err);
    res.status(500).json({ error: err.message });
  }
};

const DonationPickedByVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findByIdAndUpdate(
      id,
      { status: "pickbyvolunteer", needVolunteer: false },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    res.status(200).json({ message: "Food picked successfully.", donation });
  } catch (err) {
    console.error("Error picking donation:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  volunteer,
  getCurrentAcceptedDonation,
  acceptDonationByVolunteer,
  DonationPickedByVolunteer,
};
