function openRegister() {
    document.getElementById("registerPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("registerPopup").style.display = "none";
}

// ---------- REGISTER ----------
async function registerUser() {
    const data = {
        fullName: regName.value,
        mobile: regMobile.value,
        email: regEmail.value,
        address: {
            village: village.value,
            post: post.value,
            ps: ps.value,
            district: district.value,
            pincode: pincode.value,
            extra: extra.value
        }
    };

    // TODO: OTP SEND CODE HERE (Future)
    // sendOTP(data.mobile);

    const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if(result.success) closePopup();
}

// ---------- LOGIN ----------
async function sendOTP() {
    const mobile = mobileNumber.value;

    // TODO: OTP VERIFY CODE HERE (Future)

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile })
    });

    const data = await res.json();
    if(data.success){
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "home.html";
    } else {
        alert(data.message);
    }
}
