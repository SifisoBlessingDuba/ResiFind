document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Logged in successfully') {
            alert('Login successful!');
            window.location.href = 'adminPage.html'; 
        } else {
            alert('Login failed.');
        }
    })
    .catch(error => console.error('Error:', error));
});
