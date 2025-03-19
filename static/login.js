document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = 'green';
            messageElement.textContent = data.message;
            setTimeout(() => {
                window.location.href = data.redirect;
            }, 1000);
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = data.error || 'Error al iniciar sesión';
        }
    } catch (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Error al iniciar sesión';
    }
});