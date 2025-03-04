// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please log in to access your profile.');
        window.location.href = 'login.html';
        return;
    }

    // Get form elements
    const profileForm = document.getElementById('profile-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneNumberInput = document.getElementById('phone-number');
    const accessCardInput = document.getElementById('access-card');
    const profilePictureInput = document.getElementById('profile-picture');

    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Populate form with user data
    if (userData) {
        fullNameInput.value = userData.fullName || '';
        phoneNumberInput.value = userData.phoneNumber || '';
        accessCardInput.value = userData.accessCard || '';
        if (userData.profilePicture) {
            displayProfilePicture(userData.profilePicture);
        }
    }

    // Handle form submission
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form values
        const fullName = fullNameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        const accessCard = accessCardInput.value.trim();

        // Perform validation
        let isValid = true;

        // Validate Full Name
        if (fullName === '') {
            setInvalid('full-name', 'Please enter your full name.');
            isValid = false;
        } else {
            setValid('full-name');
        }

        // Validate Phone Number
        if (!/^\d{10}$/.test(phoneNumber)) {
            setInvalid('phone-number', 'Please enter a valid 10-digit phone number.');
            isValid = false;
        } else {
            setValid('phone-number');
        }

        // Validate Access Card Number
        if (!/^\d{16}$/.test(accessCard)) {
            setInvalid('access-card', 'Please enter a valid 16-digit card number.');
            isValid = false;
        } else {
            setValid('access-card');
        }

        if (!isValid) {
            return;
        }

        // Handle profile picture upload
        const profilePictureFile = profilePictureInput.files[0];
        if (profilePictureFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePictureData = e.target.result;
                saveProfileData(fullName, phoneNumber, accessCard, profilePictureData);
                displayProfilePicture(profilePictureData);
            };
            reader.readAsDataURL(profilePictureFile);
        } else {
            // No new profile picture
            saveProfileData(fullName, phoneNumber, accessCard, userData.profilePicture);
        }
    });

    // Save profile data to localStorage and sessionStorage
    function saveProfileData(fullName, phoneNumber, accessCard, profilePicture) {
        // Update user data
        const updatedUserData = {
            ...userData,
            fullName: fullName,
            phoneNumber: phoneNumber,
            accessCard: accessCard,
            profilePicture: profilePicture
        };

        // Save updated data to localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        // Update session data
        sessionStorage.setItem('userFullName', fullName);
        if (profilePicture) {
            sessionStorage.setItem('profilePicture', profilePicture);
        }

        alert('Profile updated successfully!');
    }

    // Display profile picture
    function displayProfilePicture(profilePictureData) {
        // Check if image element already exists
        let imgElement = document.querySelector('.profile-picture');
        if (!imgElement) {
            imgElement = document.createElement('img');
            imgElement.classList.add('profile-picture');
            // Insert the image before the form
            profileForm.parentElement.insertBefore(imgElement, profileForm);
        }
        imgElement.src = profilePictureData;
    }

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
