// payment.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please log in to continue.');
        window.location.href = 'login.html';
        return;
    }

    const loadRidesForm = document.getElementById('load-rides-form');
    const ticketTypeSelect = document.getElementById('ticket-type');
    const quantityInput = document.getElementById('quantity');
    const totalAmountDisplay = document.getElementById('total-amount');

    // Pricing for tickets
    const ticketPrices = {
        'weekly': 158,
        'bi-weekly': 300,
        'monthly': 600
    };

    // Update total amount when ticket type or quantity changes
    function updateTotalAmount() {
        const ticketType = ticketTypeSelect.value;
        const quantity = parseInt(quantityInput.value) || 1;
        const price = ticketPrices[ticketType] || 0;
        const total = price * quantity;
        totalAmountDisplay.textContent = `R${total.toFixed(2)}`;
    }

    ticketTypeSelect.addEventListener('change', updateTotalAmount);
    quantityInput.addEventListener('input', updateTotalAmount);

    // Initially update the total amount
    updateTotalAmount();

    // Handle form submission
    loadRidesForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form values
        const ticketType = ticketTypeSelect.value;
        const quantity = parseInt(quantityInput.value) || 1;

        // Validate selections
        let isValid = true;
        if (!ticketType) {
            setInvalid('ticket-type', 'Please select a pass type.');
            isValid = false;
        } else {
            setValid('ticket-type');
        }

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            setInvalid('quantity', 'Please enter a valid quantity.');
            isValid = false;
        } else {
            setValid('quantity');
        }

        if (!isValid) {
            return;
        }

        const price = ticketPrices[ticketType];
        const totalAmount = price * quantity;

        // Generate unique reference number
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const referenceNumber = `BUS${timestamp}${randomNum}`;

        // Store payment details in sessionStorage
        sessionStorage.setItem('totalAmount', totalAmount.toFixed(2));
        sessionStorage.setItem('referenceNumber', referenceNumber);

        // Redirect to payment page
        window.location.href = 'payment.html';
    });

    // Helper functions for validation
    function setInvalid(elementId, message) {
        const element = document.getElementById(elementId);
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.textContent = message;
        element.setAttribute('aria-invalid', 'true');
    }

    function setValid(elementId) {
        const element = document.getElementById(elementId);
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        element.removeAttribute('aria-invalid');
    }
});