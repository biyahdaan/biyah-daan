function sendOTP() {
    const mobile = document.getElementById('mobileNumber').value;
    
    if(mobile.length < 10) {
        alert("Kripya sahi mobile number darj karein!");
        return;
    }
    
    // Abhi ke liye sirf message dikhayenge
    alert("OTP sent to: " + mobile);
}
