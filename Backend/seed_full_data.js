require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Donation = require('./models/donation.model');
const ReceiverRequest = require('./models/request.model');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for data seeding...");

        const donors = await User.find({ role: 'donor' });
        const volunteers = await User.find({ role: 'volunteer' });
        const receivers = await User.find({ role: 'receiver' });

        console.log(`Found ${donors.length} donors, ${volunteers.length} volunteers, ${receivers.length} receivers.`);

        if (!donors.length || !volunteers.length || !receivers.length) {
            console.error("Missing required users. Please seed users first.");
            process.exit(1);
        }

        console.log("Creating random Receiver Requests...");
        const requestData = [];
        for (let i = 0; i < 15; i++) {
            const receiver = receivers[i % receivers.length];
            const status = i < 5 ? 'pending' : (i < 12 ? 'completed' : 'cancelled');
            requestData.push({
                receiverId: receiver._id,
                receiverName: receiver.name || "Test Receiver",
                receiverPhone: receiver.phone || "0000000000",
                receiverAddress: receiver.location?.landmark || "Hyderabad",
                receiverLocation: {
                    name: receiver.location?.landmark || "Hyderabad",
                    lat: receiver.location?.lat || 17.3850,
                    long: receiver.location?.long || 78.4867
                },
                quantity: Math.floor(Math.random() * 20) + 1,
                status: status,
                isActive: status === 'pending',
                createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
            });
        }
        const createdRequests = await ReceiverRequest.insertMany(requestData);
        console.log("Receiver Requests inserted.");

        console.log("Creating random Donations...");
        const donationData = [];
        
        // 1. Some fulfilled requests
        for (let i = 0; i < 10; i++) {
            const donor = donors[i % donors.length];
            const volunteer = volunteers[i % volunteers.length];
            const request = createdRequests[i];
            
            donationData.push({
                donorId: donor._id,
                receiverId: request.receiverId,
                quantity: request.quantity,
                status: 'completed',
                volunteerId: volunteer._id,
                isReceiverRequest: true,
                location: {
                    landmark: donor.location?.landmark || "Donor Landmark",
                    lat: donor.location?.lat || 17.3850,
                    long: donor.location?.long || 78.4867
                },
                shelfLife: 24,
                createdAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000)
            });
        }

        // 2. Some direct donations
        for (let i = 0; i < 10; i++) {
            const donor = donors[Math.floor(Math.random() * donors.length)];
            const statusArr = ['pending', 'approved', 'pickbyvolunteer', 'completed'];
            const status = statusArr[Math.floor(Math.random() * statusArr.length)];
            const vol = (status === 'pickbyvolunteer' || status === 'completed') ? volunteers[Math.floor(Math.random() * volunteers.length)]._id : null;
            
            donationData.push({
                donorId: donor._id,
                quantity: Math.floor(Math.random() * 50) + 1,
                status: status,
                volunteerId: vol,
                needVolunteer: status === 'approved',
                location: {
                    landmark: donor.location?.landmark || "Donor Landmark",
                    lat: donor.location?.lat || 17.3850,
                    long: donor.location?.long || 78.4867
                },
                shelfLife: 24,
                createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
            });
        }

        // 3. Fake donations
        const fakeDonor = donors[0];
        const nowMs = Date.now();
        for (let i = 0; i < 3; i++) {
            donationData.push({
                donorId: fakeDonor._id,
                quantity: 10,
                status: 'pending',
                location: {
                    landmark: fakeDonor.location?.landmark || "Fake Landmark",
                    lat: fakeDonor.location?.lat || 17.3850,
                    long: fakeDonor.location?.long || 78.4867
                },
                shelfLife: 12,
                createdAt: new Date(nowMs - i * 2 * 60 * 1000)
            });
        }

        await Donation.insertMany(donationData);

        console.log("Data seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`- Field ${key}: ${error.errors[key].message}`);
            });
        }
        process.exit(1);
    }
};

seedData();
