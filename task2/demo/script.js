// Get elements
const websiteInput = document.getElementById('website');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const addBtn = document.getElementById('add');
const generateBtn = document.getElementById('generate');
const passwordList = document.getElementById('passwordList');

// Load saved passwords from localStorage
let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
displayPasswords();

// Add password
addBtn.addEventListener('click', () => {
  const website = websiteInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!website || !username || !password) {
    alert('Please fill all fields!');
    return;
  }

  passwords.push({ website, username, password });
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords();

  // Clear inputs
  websiteInput.value = '';
  usernameInput.value = '';
  passwordInput.value = '';
});

// Generate random password
generateBtn.addEventListener('click', () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let pass = '';
  for (let i = 0; i < 12; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = pass;
});

// Display passwords
function displayPasswords() {
  passwordList.innerHTML = '';
  passwords.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.website}</td>
      <td>${item.username}</td>
      <td>
        <input type="password" value="${item.password}" readonly>
        <button onclick="togglePassword(${index})">Show</button>
      </td>
      <td>
        <button onclick="deletePassword(${index})">Delete</button>
      </td>
    `;
    passwordList.appendChild(row);
  });
}

// Toggle password visibility
function togglePassword(index) {
  const row = passwordList.children[index];
  const input = row.querySelector('input');
  const btn = row.querySelector('button');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
  }
}

// Delete password
function deletePassword(index) {
  passwords.splice(index, 1);
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords();
}
