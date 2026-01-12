function openRegister() {
    document.getElementById("registerPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("registerPopup").style.display = "none";
}

async function registerUser() {

    const data = {
        fullName: regName.value.trim(),
        mobile: regMobile.value.trim(),
        email: regEmail.value.trim(),
        address: {
            village: village.value.trim(),
            post: post.value.trim(),
            ps: ps.value.trim(),
            district: district.value.trim(),
            pincode: pincode.value.trim(),
            extra: extra.value.trim()
        }
    };

    if (!data.fullName) return alert("Full name required");
    if (!/^[0-9]{10}$/.test(data.mobile)) return alert("Valid mobile required");
    if (!data.address.village || !data.address.district)
        return alert("Village & District required");

    alert("Registration successful (Demo)");
    closePopup();
}

async function sendOTP() {

    const mobile = mobileNumber.value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter valid mobile number");
        return;
    }

    alert("OTP Sent (Demo)");
}
