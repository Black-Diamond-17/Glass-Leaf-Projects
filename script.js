

// Ensure users object exists in localStorage
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify({}));
}

// Helper to get users
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

// Helper to save users
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}



const username = document.getElementById('username');
const userPassword = document.getElementById('userPassword');
const userProfile = document.getElementById('profile');

const loginBTN = document.getElementById('login');
const profileHead = document.getElementById('head');
const userAuthentication = document.getElementById('userAuth');
const loader = document.getElementById('loader');
const userContent = document.getElementById('content');
const greetUser = document.getElementById('greetUser');

function login(name, password) {
  return new Promise((resolve, reject) => {
    const users = getUsers(); // load from localStorage
    const userFound = Object.values(users).find(
      user => user.username === name && user.password === password
    );

    if (!name || !password) {
      reject('Please provide your details');
      return;
    }

    if (!userFound) {
      setTimeout(() => reject('Invalid Name or Password!'), 1000);
      return;
    }

    setTimeout(() => resolve('Signed in successfully!'), 1000);
  });
}


if (loginBTN) {
  loginBTN.addEventListener('click', async () => {
    try {
      let dispProfile = await login(username.value, userPassword.value);
      infoBarStatus('#bbffbbff', '#008c00ff', dispProfile);
      loader.style.display = 'flex';
      userAuthentication.style.display = 'none';
      setTimeout(() => {
        userProfile.style.display = 'block';
        loader.style.display = 'none';
      }, 3500);
      greetUser.innerHTML += username.value;
    } catch (error) {
      infoBarStatus('#ffceceff', '#ff5e5eff', error);
    }
  });
}

async function fetchData() {
  profileHead.innerHTML = '';
  infoBarStatus('#bbffbbff', '#008c00ff', 'Fetching Data...');
  let URL = `https://api.agify.io?name=${username.value}`;
  let response = await fetch(URL);
  if (!response.ok) {
    infoBarStatus('#ffceceff', '#ff5e5eff', 'Could not Fetch Data');
    return;
  }
  let data = await response.json();
  let ageGroup = data.age < 18 ? 'Child' : data.age < 65 ? 'Adult' : 'Elderly';
  profileHead.innerHTML = `<h2>${data.name}</h2><h3>Age: ${data.age} (${ageGroup})</h3><p>Based on ${data.count} records</p>`;
}

const logoutBTN = document.getElementById('logout');
if (logoutBTN) {
  logoutBTN.addEventListener('click', () => {
    loader.style.display = 'flex';
    userProfile.style.display = 'none';
    setTimeout(() => {
      if (username) username.value = '';
      if (userPassword) userPassword.value = '';
      if (profileHead) profileHead.innerHTML = '';
      if (greetUser) greetUser.innerHTML = 'Welcome Back ';
      loader.style.display = 'none';
      if (userAuthentication) userAuthentication.style.display = 'block';
    }, 1500);
  });
}
