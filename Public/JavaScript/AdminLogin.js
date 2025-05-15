"use strict";

function login() {
    let Name = document.getElementById('nameInput').value;
    let Email = document.getElementById('emailInput').value;
    let Password = document.getElementById('passwordInput').value;

    console.log(Name, Email, Password);
                const AdminLogin = {
                    Name : Name,
                    Email : Email ,
                    Password : Password
                };

                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(AdminLogin)
                })
                .then(response => response.json())
                .then(data => {
                  if (data.valid) {
                    console.log('Login successful');
                    alert('Login successful');
                    window.location.href = '/AdminDashboard';
                  } else {
                    console.error('Invalid login');
                    alert('Invalid login');
                  }
                })
                .catch((error) => {
                    console.error('Error:', error);

                    alert('An error occurred during login.' , error);
                  });
               

            
          }
         

        
    

