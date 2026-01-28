document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorPopup = document.getElementById('errorPopup');
    const closePopupBtn = document.getElementById('closePopup');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const credentials = {
            username: usernameInput.value,
            password: passwordInput.value
        };

        // Send credentials to backend
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(response => response.json())
            .then(data => {
                // Irrespective of success or mock error, shows the popup as requested
                // User requirement: "next when teh user clicks on the login buttton ... show them a pop up messaeg"
                showPopup();
            })
            .catch((error) => {
                console.error('Error:', error);
                showPopup();
            });
    });

    closePopupBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });

    function showPopup() {
        errorPopup.classList.remove('hidden');
    }
});
