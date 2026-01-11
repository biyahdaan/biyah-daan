// ---------- OPEN / CLOSE REGISTER POPUP ----------
function openRegister() {
    document.getElementById("registerPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("registerPopup").style.display = "none";
}

// ---------- REGISTER USER ----------
async function registerUser() {

    const data = {
        fullName: document.getElementById("regName").value.trim(),
        mobile: document.getElementById("regMobile").value.trim(),
        email: document.getElementById("regEmail").value.trim(),

        address: {
            village: document.getElementById("village").value.trim(),
            post: document.getElementById("post").value.trim(),
            ps: document.getElementById("ps").value.trim(),
            district: document.getElementById("district").value.trim(),
            pincode: document.getElementById("pincode").value.trim(),
            extra: document.getElementById("extra").value.trim()
        }
    };

    // ---------- VALIDATION (REGISTER) ----------
    if (data.fullName === "") {
        alert("Full Name required hai");
        return;
    }

    if (!/^[0-9]{10}$/.test(data.mobile)) {
        alert("Please sahi 10 digit mobile number dalein");
        return;
    }

    if (data.address.village === "" || data.address.district === "") {
        alert("Village aur District zaroori hai");
        return;
    }

    // TODO: OTP SEND CODE HERE (Future)
    // sendOTP(data.mobile);

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        if (result.success) {
            closePopup();
        }

    } catch (err) {
        alert("Server error, please try again");
    }
}

// ---------- LOGIN USER ----------
async function sendOTP() {

    const mobile = document.getElementById("mobileNumber").value.trim();

    // ---------- VALIDATION (LOGIN) ----------
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter valid 10 digit mobile number");
        return;
    }

    // TODO: OTP VERIFY CODE HERE (Future)

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobile })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "home.html";
        } else {
            alert(data.message);
        }

    } catch (err) {
        alert("Login failed, server error");
    }
}
