const mongoose = require('mongoose');

// --- 1. Item Level Schema (Har ek samaan ki detail) ---
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, default: 1 },
    unit: { type: String, default: 'Number' },
    rate: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
});

// --- 2. Service Category Schema (Jaise: Tent House, DJ, etc.) ---
const ServiceCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true }, // Jaise: "Tent House"
    items: [ItemSchema], // Iske andar us category ke saare items honge
    categoryTotal: { type: Number, default: 0 } // Poori category ka total budget
});

// --- 3. Main User Schema ---
const UserSchema = new mongoose.Schema({
    userType: { 
        type: String, 
        enum: ['vendor', 'client'], 
        required: true 
    },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, default: "" },
    altMobile: { type: String, default: "" },
    address: { type: String, default: "" },
    
    // --- Vendor's Service Folder (Main Update) ---
    // Isme vendor ki saari services aur unke items save honge
    vendorServices: [ServiceCategorySchema], 

    profilePic: { type: String, default: "" }, // Photo save karne ke liye
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);