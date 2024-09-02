// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor click behavior

        // Get the target section
        const targetSection = document.querySelector(this.getAttribute('href'));

        // Scroll smoothly to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Align the section to the top of the viewport
        });
    });
});

// Subscription tier interaction
document.querySelectorAll('.tier').forEach(tier => {
    tier.addEventListener('click', function() {
        // Remove active class from all tiers
        document.querySelectorAll('.tier').forEach(t => {
            t.classList.remove('active');
            t.classList.add('inactive');
        });

        // Add active class to the clicked tier
        this.classList.add('active');
        this.classList.remove('inactive');
    });
});
// JavaScript for handling subscription tier selection and purchase button
let selectedTier = null;

document.querySelectorAll('.tier').forEach(tier => {
    tier.addEventListener('click', function() {
        // Deselect previously selected tier
        if (selectedTier) {
            selectedTier.classList.remove('active');
            selectedTier.classList.add('inactive');
        }

        // Select the clicked tier
        selectedTier = this;
        selectedTier.classList.add('active');
        selectedTier.classList.remove('inactive');

        // Enable the purchase button
        const purchaseButton = document.getElementById('purchase-button');
        purchaseButton.disabled = false;
        purchaseButton.textContent = 'Purchase';
    });
});

document.getElementById('purchase-button').addEventListener('click', function() {
    if (selectedTier) {
        alert('Purchase successful!');
    } else {
        this.textContent = 'Please select a plan';
        setTimeout(() => {
            this.textContent = 'Purchase';
        }, 2000); // Show message for 2 seconds
    }
});
// Handle tier clicks
document.querySelectorAll('.tier').forEach(tier => {
    tier.addEventListener('click', function() {
        // Deselect previously selected tier
        if (selectedTier) {
            selectedTier.classList.remove('active');
            selectedTier.classList.add('inactive');
        }

        // Select the clicked tier
        selectedTier = this;
        selectedTier.classList.add('active');
        selectedTier.classList.remove('inactive');

        // Enable the purchase button
        const purchaseButton = document.getElementById('purchase-button');
        purchaseButton.disabled = false;
        purchaseButton.textContent = 'Purchase';
    });
});

// Handle purchase button click
document.getElementById('purchase-button').addEventListener('click', function() {
    if (selectedTier) {
        alert('Purchase successful!');
        this.disabled = true;
        this.textContent = 'Purchased';
        document.getElementById('cancel-button').style.display = 'inline-block'; // Show cancel button
    } else {
        this.textContent = 'Please select a plan';
        setTimeout(() => {
            this.textContent = 'Purchase';
        }, 2000); // Show message for 2 seconds
    }
});

// Handle cancel button click
document.getElementById('cancel-button').addEventListener('click', function() {
    alert('Subscription canceled.');
    this.style.display = 'none'; // Hide cancel button
    document.getElementById('purchase-button').disabled = false;
    document.getElementById('purchase-button').textContent = 'Purchase'; // Reset purchase button text
    if (selectedTier) {
        selectedTier.classList.remove('active');
        selectedTier.classList.add('inactive');
        selectedTier = null;
    }
});
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful');
            // Optionally, store the user session
            sessionStorage.setItem('user', JSON.stringify(data.user));
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
