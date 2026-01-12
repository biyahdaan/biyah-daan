function openLogin(){
  window.location.href="login.html";
}

// CHECK LOGIN
const user = JSON.parse(localStorage.getItem("user"));
if(user){
  loginBtn.style.display="none";
  bottomNav.style.display="flex";
  pmobile.value=user.mobile;
  pname.value=user.fullName;
  paddress.value=`${user.address.village}, ${user.address.district}`;
}

// PAGE SWITCH
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById(id).style.display="block";
}

// PHOTO
function uploadPhoto(e){
  const file=e.target.files[0];
  if(file){
    const reader=new FileReader();
    reader.onload=()=>profilePic.src=reader.result;
    reader.readAsDataURL(file);
  }
}

function removePhoto(){
  profilePic.src="default-avatar.png";
}

function saveProfile(){
  alert("Profile saved (Demo)");
}
