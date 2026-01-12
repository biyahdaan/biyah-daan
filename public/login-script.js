function openRegister(){
  registerPopup.style.display="flex";
}
function closePopup(){
  registerPopup.style.display="none";
}

function registerUser(){
  const user={
    fullName:regName.value,
    mobile:regMobile.value,
    address:{village:village.value,district:district.value}
  };

  // OTP SEND HERE (FUTURE)
  // sendOTP(user.mobile);

  localStorage.setItem("user",JSON.stringify(user));
  alert("Registered Successfully");
  window.location.href="index.html";
}

function sendOTP(){
  const mobile=mobileNumber.value;
  if(!/^[0-9]{10}$/.test(mobile)) return alert("Invalid mobile");

  // OTP VERIFY CODE HERE (FUTURE)
  // verifyOTP()

  alert("Login Success (OTP skipped)");
  window.location.href="index.html";
}
