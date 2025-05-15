
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const registerMessage = document.getElementById('registerMessage');
const loginMessage = document.getElementById('loginMessage');

const registeredUsers = [];


registerForm.addEventListener('submit', (event) => {

  event.preventDefault();
  const number = document.getElementById('StudentInput').value.trim();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const telphone = document.getElementById('TelphoneInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();   
  let isValid = true;
  registerMessage.textContent = '';

  if (name === '' || email === '' || password === '') {
    isValid = false;
    registerMessage.textContent = 'Please fill in all fields.';
  }

  if (isValid && !email.endsWith('@mycput.ac.za')) {
    isValid = false;
    registerMessage.textContent = 'Email must end with @mycput.ac.za.';
  }

  if (isValid && password.length < 6) {
    isValid = false;
    registerMessage.textContent = 'Password must be at least 6 characters long.';
  }

  if (isValid) {
    registeredUsers.push({ name, email, password });
  }

});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginEmail = document.getElementById('loginEmailInput').value.trim();
  const loginPassword = document.getElementById('loginPasswordInput').value.trim();
  let isValidLogin = true;
  loginMessage.textContent = '';

  if (loginEmail === '' || loginPassword === '') {
    isValidLogin = false;
    loginMessage.textContent = 'Please fill in all fields.';
  }

  if (isValidLogin) {
    const foundUser = registeredUsers.find(user => user.email === loginEmail && user.password === loginPassword);
    if (!foundUser) {
      isValidLogin = false;
      loginMessage.textContent = 'Invalid email or password.';
    }
  }

  if (isValidLogin) {
    window.location.href = '/home';
  }

});

document.getElementById('toggleLoginBtn').addEventListener('click', () => {
  document.getElementById('registerFormContainer').style.display = 'none';
  document.getElementById('loginFormContainer').style.display = 'block';

});

document.getElementById('toggleRegisterBtn').addEventListener('click', () => {
  document.getElementById('loginFormContainer').style.display = 'none';
  document.getElementById('registerFormContainer').style.display = 'block';
});
