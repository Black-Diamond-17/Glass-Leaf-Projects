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


// Grab the sign up button (make sure HTML has id="signUp")
const signUpBtn = document.getElementById('signUp');
const loader = document.getElementById('loader');


// Grab userProfile if it exists on this page
const userProfile = document.getElementById('userProfile');

// Only attach if the button exists
if (signUpBtn) {
  signUpBtn.addEventListener('click', async () => {
    if (loader) {loader.style.display = 'flex';} // guard in case loader isn't on this page

    try {
      let userCreated = await newUser();
      infoBarStatus('#bbffbbff', '#008c00ff', userCreated);

      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block'; // only if profile exists
      }, 1000);
    } catch (error) {
      infoBarStatus('#ffceceff', '#ff5e5eff', error);
    }
  });
}

function newUser() {
  return new Promise((resolve, reject) => {
    const Name = document.getElementById("name");
    const newUserName = document.getElementById("newUserName");
    const password = document.getElementById("userPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    let users = getUsers(); // load from localStorage

    if (!Name.value || !newUserName.value) {
      reject("Name and Username are required");
      return;
    }
    if (users[Name.value.toLowerCase()]) {
      reject("User already exists");
      return;
    }
    if (password.value !== confirmPassword.value) {
      reject("Passwords do not match");
      return;
    }
    if (!password.value || !confirmPassword.value) {
      reject("Password fields cannot be empty");
      return;
    }

    setTimeout(() => {
      users[Name.value.toLowerCase()] = {
        username: newUserName.value,
        password: password.value
      };
      saveUsers(users); // save back to localStorage
      resolve("User Created Successfully");
    }, 1000);
  });
}

// Note: users object should be defined in a shared script or passed appropriately
