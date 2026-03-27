require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

const firstNames = ["Rahul", "Amit", "Rajesh", "Vikram", "Anand", "Suresh", "Priya", "Neha", "Sneha", "Anjali", "Gaurav", "Sanjay", "Kavita", "Ramesh", "Sunita"];
const lastNames = ["Sharma", "Singh", "Patel", "Kumar", "Rao", "Reddy", "Gupta", "Das", "Joshi", "Verma", "Choudhary", "Naidu", "Yadav"];
const landmarks = [
  "Madhapur, HITEC City", "Kukatpally Housing Board", "Banjara Hills, Road No 12",
  "Jubilee Hills, Check Post", "Gachibowli, near DLF", "Ameerpet, Maitrivanam",
  "Secunderabad, Paradise Circle", "Mehdipatnam, Rythu Bazar", "Dilsukhnagar, near Sai Temple",
  "Kondapur, near Sarath City Capital Mall", "Miyapur, near Metro Station", "LB Nagar, Ring Road",
  "Uppal, near Stadium", "Tarnaka, near Osmania Univ", "Begumpet, near Prakash Nagar"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomLat = () => 17.3500 + Math.random() * 0.1000;
const getRandomLong = () => 78.3500 + Math.random() * 0.1500;

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Delete existing non-admins
    await User.deleteMany({ role: { $ne: "admin" } });

    const passwordHash = await bcrypt.hash("AbhinaV.242", 10);

    const donors = [];
    for(let i=0; i<10; i++) {
      const f = getRandomItem(firstNames);
      const l = getRandomItem(lastNames);
      donors.push({
        name: `${f} ${l}`,
        phone: (7799990265 + i).toString(),
        password: passwordHash,
        role: "donor",
        email: `${f.toLowerCase()}.${l.toLowerCase()}${i}@gmail.com`,
        location: {
          landmark: getRandomItem(landmarks) + ", Hyderabad",
          lat: getRandomLat(),
          long: getRandomLong()
        }
      });
    }
    await User.insertMany(donors);

    const volunteers = [];
    for(let i=0; i<10; i++) {
        const f = getRandomItem(firstNames);
        const l = getRandomItem(lastNames);
        volunteers.push({
          name: `${f} ${l}`,
          phone: (8919606275 + i).toString(),
          password: passwordHash,
          role: "volunteer",
          email: `${f.toLowerCase()}.${l.toLowerCase()}${i}@gmail.com`,
          location: {
            landmark: getRandomItem(landmarks) + ", Hyderabad",
            lat: getRandomLat(),
            long: getRandomLong()
          }
        });
    }
    await User.insertMany(volunteers);

    const receivers = [];
    // Orgs names
    const orgs = ["Akshaya Patra", "Smile Foundation", "Goonj", "HelpAge India", "Bhumi", "Uday Foundation", "Robin Hood Army", "Snehalaya", "CRY India", "Pratham"];
    for(let i=0; i<10; i++) {
        receivers.push({
          name: orgs[i],
          phone: (9542165599 + i).toString(),
          password: passwordHash,
          role: "receiver",
          email: `contact@${orgs[i].toLowerCase().replace(/\\s/g, '')}.org`,
          location: {
            landmark: getRandomItem(landmarks) + ", Hyderabad",
            lat: getRandomLat(),
            long: getRandomLong()
          }
        });
    }
    await User.insertMany(receivers);

    const fs = require('fs');
    let out = "# Generated Users\n\n## Donors\n";
    out += "| Name | Phone | Email | Address/Landmark |\n| --- | --- | --- | --- |\n";
    donors.forEach(d => out += `| ${d.name} | ${d.phone} | ${d.email} | ${d.location.landmark} |\n`);
    
    out += "\n## Volunteers\n";
    out += "| Name | Phone | Email | Address/Landmark |\n| --- | --- | --- | --- |\n";
    volunteers.forEach(v => out += `| ${v.name} | ${v.phone} | ${v.email} | ${v.location.landmark} |\n`);
    
    out += "\n## Receivers (NGOs)\n";
    out += "| Name (Org) | Phone | Email | Address/Landmark |\n| --- | --- | --- | --- |\n";
    receivers.forEach(r => out += `| ${r.name} | ${r.phone} | ${r.email} | ${r.location.landmark} |\n`);

    fs.writeFileSync('C:\\Users\\manoj\\.gemini\\antigravity\\brain\\2a29c0d9-380a-4932-9e8d-aa1fc4e1b646\\seeded_users.md', out);
    
    console.log("Re-seeded with realistic data successfully.");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};
seed();
