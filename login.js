const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert('Login ' + (result.success ? 'successful!' : 'failed: ' + result.message));
        window.location.href = result.redirectUrl;
    } else {
        messageDiv.textContent = result.error || 'Login failed!';
        messageDiv.style.color = 'red';
    }
});
