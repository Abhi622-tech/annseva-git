require('dotenv').config();
const mongoose = require('mongoose');
const Donation = require('./models/donation.model');
const Request = require('./models/request.model');
const Notification = require('./models/notification.model');

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for cleanup...");

    const dRes = await Donation.deleteMany({});
    console.log(`Deleted ${dRes.deletedCount} donations`);

    const rRes = await Request.deleteMany({});
    console.log(`Deleted ${rRes.deletedCount} requests`);

    const nRes = await Notification.deleteMany({});
    console.log(`Deleted ${nRes.deletedCount} notifications`);

    console.log("Cleanup complete. Users preserved.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
cleanup();
