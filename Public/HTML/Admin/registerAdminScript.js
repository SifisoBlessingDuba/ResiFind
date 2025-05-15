document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const ID = document.getElementById('ID').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,surname,ID,tel,email, password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! You can now log in.');
            window.location.href = 'adminPage.html';
        } else {
            alert('Registration failed.');
        }
    })
    .catch(error => console.error('Error:', error));
});