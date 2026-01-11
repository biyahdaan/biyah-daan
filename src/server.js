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
//////////////////////////////////////////////////////////////////////////////////////reg///////////
app.post("/api/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json({
            success: true,
            message: "Registration Successful"
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Mobile already registered"
        });
    }
});

/////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Biyah Daan Server running on port ${PORT}`));
