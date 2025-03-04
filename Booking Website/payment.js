// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const paymentForm = document.getElementById('payment-form');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');

    // Handle form submission
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form values
        const cardNumber = cardNumberInput.value.trim();
        const expiryDate = expiryDateInput.value.trim();
        const cvv = cvvInput.value.trim();

        // Perform validation
        let isValid = true;

        // Validate Card Number
        if (!/^\d{16}$/.test(cardNumber)) {
            setInvalid('card-number', 'Please enter a valid 16-digit card number.');
            isValid = false;
        } else {
            setValid('card-number');
        }

        // Validate Expiry Date
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            setInvalid('expiry-date', 'Please enter a valid expiry date (MM/YY).');
            isValid = false;
        } else {
            setValid('expiry-date');
        }

        // Validate CVV
        if (!/^\d{3}$/.test(cvv)) {
            setInvalid('cvv', 'Please enter a valid 3-digit CVV.');
            isValid = false;
        } else {
            setValid('cvv');
        }

        if (!isValid) {
            return;
        }

        // Simulate payment processing
        alert('Payment successful!');
        // Redirect to confirmation page (this is just a simulation)
        window.location.href = 'confirmation.html';
    });

    // Helper functions for validation
    function setInvalid(elementId, message) {
        const element = document.getElementById(elementId);
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        if (element.nextElementSibling) {
            element.nextElementSibling.textContent = message;
        }
        element.setAttribute('aria-invalid', 'true');
    }

    function setValid(elementId) {
        const element = document.getElementById(elementId);
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        element.removeAttribute('aria-invalid');
    }
});