// Registration and Login Simulation
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store the user data in localStorage (simple simulation)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    alert('Registration successful');
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // Check login credentials
    if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
        alert('Login successful');
    } else {
        alert('Invalid email or password');
    }
});

// Item Submission
document.getElementById('item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let itemName = document.getElementById('item-name').value;
    let itemImage = document.getElementById('item-image').files[0];
    let location = document.getElementById('location').value;
    let itemDate = document.getElementById('item-date').value;
    let itemType = document.getElementById('item-type').value;

    let reader = new FileReader();
    reader.onloadend = function() {
        let item = {
            itemName,
            itemImage: reader.result,
            location,
            itemDate,
            itemType
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        alert('Item submitted successfully');
    };
    if (itemImage) {
        reader.readAsDataURL(itemImage);
    }
});

// View Submitted Items
function displaySubmittedItems() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    let submittedItemsList = document.getElementById('submitted-items-list');
    submittedItemsList.innerHTML = '';

    items.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = `
            <strong>${item.itemName}</strong><br>
            Location: ${item.location}<br>
            Type: ${item.itemType}<br>
            Date: ${item.itemDate}<br>
            <img src="${item.itemImage}" alt="Item Image">
        `;
        submittedItemsList.appendChild(div); // Move this inside the loop
    });
    

// Load Submitted Items on Page Load
window.onload = displaySubmittedItems;
