const username = document.getElementById('username');
const userPassword = document.getElementById('userPassword');
const userProfile = document.getElementById('profile');

const loginBTN = document.getElementById('login');
const profileHead = document.getElementById('head');
const userAuthentication = document.getElementById('userAuth');
const loader = document.getElementById('loader');
const userContent = document.getElementById('content');
const greetUser = document.getElementById('greetUser');

const users = {
  kenoly:{userName: 'Black', password: 'diamond2'},
  desmond:{username: 'Desmond', password: 'aloha'}
}

function login(name, password) {
  return new Promise((resolve, reject) => {
    // Check if any user matches
    const userFound = Object.values(users).find(
      user => (user.userName || user.username) === name && user.password === password
    );

    if (!name || !password) {
      reject('Please provide your details');
      return;
    }

    if (!userFound) {
      setTimeout(() => {reject('Invalid Name or Password!');}, 1000);
      return;
    }

    setTimeout(() => {
      resolve('Signed in successfully!');
    }, 1000);
  });
}

loginBTN.addEventListener('click', async () => {
  try {
    let dispProfile = await login(username.value, userPassword.value);
    infoBarStatus('#bbffbbff', '#008c00ff', dispProfile);
    loader.style.display = 'flex';
    userAuthentication.style.display = 'none';
    setTimeout(()=>{
      setTimeout(()=>{userProfile.style.display = 'block'; loader.style.display = 'none';}, 3500)}, 1000);
    greetUser.innerHTML += username.value;
    
  } catch (error) {
    infoBarStatus('#ffceceff', '#ff5e5eff', error)
  }
})

async function fetchData() {
  profileHead.innerHTML = '';
  infoBarStatus('#bbffbbff', '#008c00ff', 'Fetching Data...');
  let URL = `https://api.agify.io?name=${username.value}`;
  let response = await fetch(URL);
  if (!response.ok){throw new Error(infoBarStatus('#ffceceff', '#ff5e5eff', 'Could not Fetch Data')); }

  let data = await response.json();
  let name = data.name;
  let count = data.count;
  let age = data.age;
  let ageGroup = age < 18 ? 'Child' : age < 65 ? 'Adult' : 'Elderly';
  profileHead.innerHTML = `<h2>${name}</h2><h3>Age: ${age} (${ageGroup})</h3> <p>Based on ${count} records</p>`;
}

function infoBarStatus(fontColor, backgroundColor, content, duration=2500) {
  const infoBar = document.querySelector('#infoBar-newUser, #infoBar') || document.createElement('div');

  infoBar.style.color = fontColor;
  infoBar.style.backgroundColor = backgroundColor;
  infoBar.innerHTML = content;
  infoBar.style.display = 'flex';
  setTimeout(() => {
    infoBar.style.display = 'none';
  }, duration);
}
function newUser(){
  return new Promise((resolve, reject) => {
    const Name = document.getElementById("name");
    const newUserName = document.getElementById("newUserName");
    const password = document.getElementById("userPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    if (!Name.value || !newUserName.value) {
      reject("Name and Username are required");
      return false;
    }
    if (users[Name.value.toLowerCase()]) {
      reject("User already exists");
      return false;
    }
    if (password.value !== confirmPassword.value) {
      reject("Passwords do not match");
      return false;
    }
    if (!password.value || !confirmPassword.value) {
      reject("Password fields cannot be empty");
      return false;
    }
    setTimeout(() => {
      resolve("User Created Successfully");
      users[Name.value.toLowerCase()] = {userName: newUserName.value, password: password.value};
    }, 1000);
  })
}

document.getElementById('signUp').addEventListener('click', async () => {
  loader.style.display = 'flex';

  try {
    let userCreated = await newUser();
    infoBarStatus('#bbffbbff', '#008c00ff', userCreated);
    setTimeout(() => {
      loader.style.display = 'none';
      userProfile.style.display = 'block';
    }, 1000);
  } catch (error) {
    infoBarStatus('#ffceceff', '#ff5e5eff', error);
    return false;
  }
});

document.getElementById('logout').addEventListener('click', () => {
  loader.style.display = 'flex';
  userProfile.style.display = 'none';
  setTimeout(()=>{
    username.value = '';
    userPassword.value = '';
    profileHead.innerHTML = '';
    greetUser.innerHTML = 'Welcome Back ';
    loader.style.display = 'none';
    userAuthentication.style.display = 'block';
  }, 1500)
});