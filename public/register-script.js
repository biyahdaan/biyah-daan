// Language Dictionary
const texts = {
    en: { sub: "Select Registration Type", vTitle: "Vendor Details", cTitle: "Client Details" },
    hi: { sub: "पंजीकरण का प्रकार चुनें", vTitle: "वेंडर का विवरण", cTitle: "ग्राहक का विवरण" },
    mai: { sub: "पंजीकरणक प्रकार चुनू", vTitle: "वेंडरक विवरण", cTitle: "ग्राहकक विवरण" },
    bho: { sub: "पंजीकरण के प्रकार चुनीं", vTitle: "वेंडर के विवरण", cTitle: "ग्राहक के विवरण" }
};

function changeLang(lang) {
    document.getElementById('reg-sub').innerText = texts[lang].sub;
    // Aap baki inputs ke placeholders ko bhi isi tarah change kar sakte hain
}

function showForm(type) {
    document.getElementById('typeSelection').style.display = 'none';
    if(type === 'vendor') {
        document.getElementById('vendorForm').style.display = 'block';
    } else {
        document.getElementById('clientForm').style.display = 'block';
    }
}

async function submitData(type) {
    // Data ikatha karna
    const data = {
        userType: type,
        fullName: type === 'vendor' ? document.getElementById('vName').value : document.getElementById('cName').value,
        mobile: type === 'vendor' ? document.getElementById('vMob').value : document.getElementById('cMob').value,
        email: type === 'vendor' ? document.getElementById('vEmail').value : document.getElementById('cEmail').value,
        altMobile: type === 'vendor' ? document.getElementById('vMob2').value : document.getElementById('cMob2').value,
        address: type === 'vendor' ? document.getElementById('vAddr').value : document.getElementById('cAddr').value,
        services: []
    };

    // Agar vendor hai to checkbox se services nikalna
    if(type === 'vendor') {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach((cb) => data.services.push(cb.value));
    }

    if(!data.fullName || !data.mobile) {
        alert("Naam aur Mobile Number zaroori hai!");
        return;
    }

    try {
        // API ko data bhejna
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(result.success) {
            alert("Badhai ho! Registration ho gaya.");
            window.location.href = "index.html";
        } else {
            alert("Error: " + result.message);
        }
    } catch (err) {
        alert("Server se connect nahi ho paya!");

    }
 window.location.href = "index.html";
}


    
   
