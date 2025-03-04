// Handle Registration Form Submission
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form values
        const fullName = document.getElementById('full-name').value.trim();
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const accessCard = document.getElementById('access-card').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Perform client-side validation
        let isValid = validateRegistrationForm(fullName, phoneNumber, accessCard, password, confirmPassword);

        if (!isValid) {
            return;
        }

        // Simulate sending OTP to the user's phone number
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        sessionStorage.setItem('otp', otp);
        alert(`OTP sent to ${phoneNumber}: ${otp}`); // In a real implementation, send OTP via SMS

        // Prompt user to enter the OTP
        const enteredOtp = prompt("Enter the OTP sent to your phone number:");
        if (enteredOtp !== otp) {
            alert("Invalid OTP. Please try again.");
            return;
        }

        // Store user data (this is just a simulation; in real applications, use a backend)
        const userData = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            accessCard: accessCard,
            password: password
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Registration successful! You can now log in.');

        // Redirect to login page
        window.location.href = 'login.html';
    });
}