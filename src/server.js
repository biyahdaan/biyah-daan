const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Frontend serve karne ke liye

// --- 1. REGISTRATION API ---
app.post('/api/register', async (req, res) => {
    try {
        const { userType, fullName, mobile, email, altMobile, address } = req.body;

        let userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Mobile number already registered!" });
        }

        const newUser = new User({
            userType,
            fullName,
            mobile,
            email,
            altMobile,
            address,
            vendorServices: [] // Starting mein khali folder
        });

        await newUser.save();
        res.status(201).json({ success: true, message: `${userType} registered successfully!` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error!" });
    }
});

// --- 2. LOGIN API (Simple Mobile Login) ---
app.post('/api/login', async (req, res) => {
    try {
        const { mobile } = req.body;
        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found! Please register." });
        }

        res.status(200).json({ 
            success: true, 
            userType: user.userType, 
            fullName: user.fullName,
            mobile: user.mobile 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed!" });
    }
});

// --- 3. SAVE SERVICES API (Folder-wise Storage) ---
app.post('/api/save-services', async (req, res) => {
    try {
        const { mobile, allServices } = req.body;

        // Vendor ko uske mobile number se find karein
        const vendor = await User.findOne({ mobile });
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found!" });
        }

        // Dashboard se aaye hue data ko User Schema ke hisab se format karein
        const formattedServices = allServices.map(srv => ({
            categoryName: srv.category,
            items: srv.items.map(item => ({
                name: item.name,
                qty: Number(item.qty),
                unit: item.unit,
                rate: Number(item.rate),
                total: Number(item.total)
            })),
            categoryTotal: srv.items.reduce((sum, item) => sum + Number(item.total), 0)
        }));

        // Database mein vendorServices folder ko update karein
        vendor.vendorServices = formattedServices;
        await vendor.save();

        res.status(200).json({ 
            success: true, 
            message: "All services saved in your vendor folder!" 
        });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ success: false, message: "Data save nahi ho paya!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Biyah Daan Server running on port ${PORT}`));