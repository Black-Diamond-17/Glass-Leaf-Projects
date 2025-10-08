const username = document.getElementById('username');
const userPassword = document.getElementById('userPassword');
const userProfile = document.getElementById('profile');

const loginBTN = document.getElementById('login');
const profileHead = document.getElementById('head');
const userAuthentication = document.getElementById('userAuth');
const loader = document.getElementById('loader');
const userContent = document.getElementById('content');
const greetUser = document.getElementById('greetUser');
const signUp = document.getElementById('signUp');

const users = {
  kenoly:{userName: 'Black', password: 'diamond2'},
  desmond:{username: 'Desmond', password: 'aloha'}
};


signUp.addEventListener('click', async () => {
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