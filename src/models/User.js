const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    village: String,
    post: String,
    ps: String,
    district: String,
    pincode: String,
    extra: String
});

const UserSchema = new mongoose.Schema({
    userType: { type: String, default: "client" },
    fullName: String,
    mobile: { type: String, unique: true },
    email: String,
    address: AddressSchema,
    profilePic: { type: String, default: "" },

    vendorServices: [],

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
