// 1. Saari services ke items pehle se define hain
const servicePresets = {
    "Tent House": ["शमियाना / जर्मन टेंट", "कारपेट / दरी", "प्लास्टिक कुर्सी", "VIP सोफा / चेयर", "टेबल", "स्टेज फ्रेम", "जनरेटर", "कूलर / पंखा"],
    "DJ Service": ["DJ कंसोल", "बेस स्पीकर", "TOP स्पीकर", "मिक्सर", "वायरलेस माइक", "DJ लाइट", "स्मोक मशीन"],
    "Catering": ["प्लेट सिस्टम", "वेज मेन्यू", "नाश्ता", "मिठाई", "हलवाई", "सर्विंग बॉय", "पानी / ड्रिंक्स"],
    "Photography": ["फोटोग्राफर", "वीडियोग्राफर", "DSLR कैमरा", "ड्रोन शूट", "एल्बम"],
    "Decoration": ["LED लाइट", "झालर लाइट", "स्टेज डेकोरेशन", "मंडप डेकोरेशन", "एंट्री गेट डेकोर"],
    "Transport": ["बारात बस", "दूल्हा कार", "विदाई कार", "ड्राइवर"],
    "Security": ["सिक्योरिटी गार्ड", "महिला गार्ड", "बाउन्सर"]
};

let blockCounter = 0;

// Page Load hote hi check karo login hai ya nahi
window.onload = () => {
    const vendorName = localStorage.getItem('fullName');
    const vendorMob = localStorage.getItem('mobile');
    
    if(!vendorMob) {
        alert("Pehle Login Karein!");
        window.location.href = "login.html";
        return;
    }
    document.getElementById('vendorNameDisplay').innerText = `Welcome, ${vendorName}`;
    document.getElementById('sidebarName').innerText = vendorName;
};

// 2. Naya Service Block (Table) Add karne wala main function
function addNewServiceBlock() {
    const category = document.getElementById('categorySelect').value;
    if (!category) {
        alert("Kripya pehle ek category chunein!");
        return;
    }

    blockCounter++;
    document.getElementById('finalActionBox').style.display = 'block';
    
    const wrapper = document.getElementById('allServicesWrapper');
    const block = document.createElement('div');
    block.className = "service-block";
    block.id = `block-${blockCounter}`;

    block.innerHTML = `
        <div class="service-block-header">
            <h3>सेवा (Category): ${category}</h3>
            <button class="del-block-btn" onclick="removeBlock(${blockCounter})">इस सेक्शन को हटाएं (Delete)</button>
        </div>
        <table class="items-table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Rate (₹)</th>
                    <th>Total (₹)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="tbody-${blockCounter}">
            </tbody>
        </table>
        <button class="add-row-btn" onclick="addRowToBlock(${blockCounter})">+ इस ${category} में और सामान जोड़ें</button>
    `;

    wrapper.appendChild(block);

    if (servicePresets[category]) {
        servicePresets[category].forEach(item => addRowToBlock(blockCounter, item));
    } else {
        addRowToBlock(blockCounter);
    }
}

// 3. Block ke andar nayi row jodne ke liye
function addRowToBlock(id, itemName = "") {
    const tbody = document.getElementById(`tbody-${id}`);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" value="${itemName}" placeholder="Item name..." class="i-name"></td>
        <td><input type="number" value="1" class="i-qty" oninput="calculateRow(this)"></td>
        <td>
            <select class="i-unit">
                <option>Number</option><option>Sq. Ft</option><option>Per Plate</option>
                <option>Per Day</option><option>Per Event</option><option>Kg</option><option>Meter</option>
            </select>
        </td>
        <td><input type="number" value="0" class="i-rate" oninput="calculateRow(this)"></td>
        <td class="i-total">0</td>
        <td><button class="del-row-btn" onclick="this.parentElement.parentElement.remove()">🗑️</button></td>
    `;
    tbody.appendChild(row);
}

// 4. Calculation Logic
function calculateRow(el) {
    const row = el.parentElement.parentElement;
    const qty = parseFloat(row.querySelector('.i-qty').value) || 0;
    const rate = parseFloat(row.querySelector('.i-rate').value) || 0;
    row.querySelector('.i-total').innerText = (qty * rate).toFixed(2);
}

// 5. Section Delete
function removeBlock(id) {
    if(confirm("Kya aap is puri service category ko hatana chahte hain?")) {
        document.getElementById(`block-${id}`).remove();
        if(document.querySelectorAll('.service-block').length === 0) {
            document.getElementById('finalActionBox').style.display = 'none';
        }
    }
}

// 6. Custom Category
function toggleCustomCategory() {
    const box = document.getElementById('customCategoryBox');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function addNewCategoryToList() {
    const newCatInput = document.getElementById('newCategoryName');
    const select = document.getElementById('categorySelect');
    const val = newCatInput.value.trim();
    if (!val) return alert("Naam likhein!");
    const option = document.createElement('option');
    option.value = val;
    option.text = val;
    select.add(option);
    select.value = val;
    newCatInput.value = "";
    toggleCustomCategory();
}

// 7. REAL DATA SAVE TO MONGODB
async function saveAllServicesData() {
    const mobile = localStorage.getItem('mobile');
    if(!mobile) return alert("Session Expired! Re-login karein.");

    const allBlocks = document.querySelectorAll('.service-block');
    const finalData = [];

    allBlocks.forEach(block => {
        const category = block.querySelector('h3').innerText.replace('सेवा (Category): ', '');
        const rows = block.querySelectorAll('tbody tr');
        const items = [];

        rows.forEach(row => {
            items.push({
                name: row.querySelector('.i-name').value,
                qty: row.querySelector('.i-qty').value,
                unit: row.querySelector('.i-unit').value,
                rate: row.querySelector('.i-rate').value,
                total: row.querySelector('.i-total').innerText
            });
        });
        finalData.push({ category, items });
    });

    try {
        const response = await fetch('/api/save-services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile, allServices: finalData })
        });

        const result = await response.json();
        if(result.success) {
            alert("✅ Mubarak ho! Sabhi data aapke folder mein save ho gaya.");
        } else {
            alert("❌ Error: " + result.message);
        }
    } catch (err) {
        alert("Server connection failed!");
    }
}

function logout() {
    if(confirm("Logout karna chahte hain?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}