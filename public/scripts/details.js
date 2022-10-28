const login = document.querySelector('.login');
const register = document.querySelector('.register');
const landing = document.querySelector('#landing');
const signInSection = document.querySelector('.sign-in');
const signUpSection = document.querySelector('.sign-up');
const mail = document.querySelector('.mailInput');
const key = document.querySelector('.passwordInput');
const submit = document.querySelector('#subBtn');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const rPassword = document.querySelector('#r-password');
const createUser = document.querySelector('.subUser')


login.addEventListener('click', () => {
  console.log('clicking');
  landing.classList.add('hidden')
  signInSection.classList.remove('hidden')
  if(!signUpSection.classList.contains('hidden')) signUpSection.classList.add('hidden')
})

register.addEventListener('click', () => {
  landing.classList.add('hidden');
  signUpSection.classList.remove('hidden');
  if(!signInSection.classList.contains('hidden')) signInSection.classList.add('hidden')
  console.log('working')
})

const loginToAcount = async(a, b) => {
  const url = '/login';
  const detail = {
    "Email": a,
    "Password": b
  }
  const options = {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify(detail),
    headers: {
      "Content-Type": "application/json"
    }
  }
  const data = await fetch(url, options);
  const json = await data.json();
  if (json.query != 'User Not Found') {
      window.open('/home', '_top');
    } else {
      window.open('./error', '_top');
    }
}

const sendUser = async (fname, lname, mail, password) => {
  const url = '/register';
  const data = {
    "First_Name": fname,
    "Last_Name": lname,
    "Email": mail,
    "Password": password
  }

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  console.log(options);
  console.log(options.method, options.body, options.headers);
  fetch(url, options).then(c => c.text()).then(g => console.log(g))
}
// Login
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  let email;
  // Validate Email
  const emailCheck = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailCheck.test(mail.value) != true) {
      document.querySelector('.s-3').textContent = 'Please Enter a valid E-mail';
      console.log('Invalid Email');
  } else {
    email = mail.value;
  }
  // Get password
    let pass = key.value;
  loginToAcount(email, pass);
})
// Create User Button
createUser.addEventListener('click', (e) => {
  e.preventDefault();
  let firstNameInput;
  let lastNameInput;
  let emailInput;
  let passwordInput;
  //---------------------- VALIDATION ------------------------------ ||
    const regex = /^[a-zA-Z]+$/
  // Validate First Name
  if (firstName.value.trim().length < 3) {
    document.querySelector('.s-1').textContent = 'First Name Should be longer than 2 Characters';
  } else if (regex.test(firstName.value) != true) {
    document.querySelector('.s-1').textContent = 'First Name Should be all Characters';
  } else if (firstName.value.trim().length > 21) {
    document.querySelector('.s-1').textContent = 'First Name Should be shorter than 20 Characters';
  } else {
    firstNameInput = firstName.value;
  }

  console.log(firstNameInput)

  // Validate Last Name
  if (lastName.value.trim().length < 3) {
    document.querySelector('.s-2').textContent = 'Last Name Should be longer than 2 Characters';
    return;
  } else if (regex.test(lastName.value) != true) {
    document.querySelector('.s-2').textContent = 'Last Name Should be all Characters';
    return;
  } else if (lastName.value.trim().length > 21) {
    document.querySelector('.s-2').textContent = 'Last Name Should be shorter than 20 Characters';
    return;
  } else {
    lastNameInput = lastName.value;
  }
  
  // Validate Email
  const emailCheck = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (emailCheck.test(email.value) != true) {
    document.querySelector('.s-3').textContent = 'Please Enter a valid E-mail'
  } else {
    emailInput = email.value;
  }

  // Validate Password
  const passwordCheck = /^[a-zA-Z0-9]+$/
    if (password.value.trim().length < 7) {
    document.querySelector('.s-4').textContent = 'Password should be longer than 6 Characters';
  } else if (passwordCheck.test(password.value) != true) {
    document.querySelector('.s-4').textContent = 'Password should contain Numbers and Letters';
  } else if (password.value != rPassword.value) {
    console.log(rPassword.value)
    document.querySelector('.s-4').textContent = 'Password should be equal to retyped password';
  } else {
    passwordInput = password.value;
  }
  console.log(rPassword.value)
  // Send User to Server
  if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput) {
    document.querySelector('.s-5').textContent = 'Some of your inputs are invalid';
  } else {
    sendUser(firstNameInput, lastNameInput, emailInput, passwordInput)
  }
})
