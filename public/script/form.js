

const emailChars = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dobField = document.getElementById('dob')
const registerBtn = document.getElementById("register-btn")
const dateForm = document.getElementById('dateForm');
const lowerCaseLetters = /[a-z]/; // Checks for at least one lowercase letter
const upperCaseLetters = /[A-Z]/; // Checks for at least one uppercase letter
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/; // Checks for at least one special character


function nameCheck(){
  let name = document.getElementById("name");
  let textbox_01 = document.getElementById("FirstNameForm");

  if(name.value.trim() === ""){
    textbox_01.textContent = "X Blank Values are not allowed";
    textbox_01.className = 'invalid-feedback'
    name.style.border = "2px solid red"
  }else if(name.value.length<3){
    textbox_01.textContent = 'X Length of the name should be 3 characters only'
    textbox_01.className = 'invalid-feedback'
    name.style.border = "2px solid red"
  }else{
    textbox_01.textContent = '✔'
    textbox_01.className = 'valid-feedback'
    name.style.border = '2px solid green'
  }
}

function emailCheck(){
  let email = document.getElementById("email");
  let textbox_02 = document.getElementById("emailForms")

  if(email.value.trim() === ""){
    textbox_02.textContent = "X Blanks Values are not allowed"
    textbox_02.className = 'invalid-feedback'
    email.style.border = "2px solid red"
  }else if(!emailChars.test(email.value)){
    textbox_02.textContent = 'X Please Enter Valid Email Id'
    textbox_02.className = 'invalid-feedback'
    email.style.border = '2px solid red'
  }else{
    textbox_02.textContent = '✔'
    textbox_02.className = "valid-feedback"
    email.style.border = '2px solid green'
  }
}


function validateAge(){
  const dob = new Date(dobField.value);
  const today = new Date();

  const age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  const dayDifference = today.getDate() - dob.getDate();

  const isUnderAge = 
  age<18 ||
  (age == 18 && monthDifference <0) ||
  (age == 18 && monthDifference === 0 && dayDifference <0);

  if(isUnderAge){
  console.log("Under Age")
  registerBtn.disabled = true;
  dateForm.textContent = 'Too Young to Register'
  dobField.style.border = '2px solid red';
  dateForm.className = 'invalid-feedback'

}else{
  console.log("Above Age")
  dateForm.textContent = ''
  registerBtn.disabled = false;
  dobField.style.border = "2px solid green"
  dateForm.className = 'valid-feedback'
  }  
}


function passwordCheck(){
  let password = document.getElementById("password");
  let textbox = document.getElementById("passwordForm");

  if(password.value.trim() === ''){
    textbox.textContent = 'X Blank Values are not allowed'
    textbox.className = 'invalid-feedback'
    password.style.border = '2px solid red'
    return false;
  }else if(password.value.length < 8){
    textbox.textContent = 'X Password should be more than 8 characters'
    textbox.className = 'invalid-feedback'
    password.style.border = '2px solid red'
  }else if (
    !lowerCaseLetters.test(password.value) ||
    !upperCaseLetters.test(password.value)
  ){
    textbox.textContent = 'X Password should have both lowercase and uppercase characters'
    textbox.className = 'invalid-feedback'
    password.style.border = '2px solid red'
    return false;
  }else if(!specialCharacters.test(password.value)){
    textbox.textContent = 'X Password should include at least one special character'
    textbox.className = 'invalid-feedback'
    password.style.border = '2px solid red'

  }else{
    textbox.textContent = '✔';
    textbox.className = 'valid-feedback'
    password.style.border = '2px solid green'
  }

}

function finalPassword(){
  let cpassword = document.getElementById("cpassword")
  let textbox = document.getElementById("cpasswordform")

  if(cpassword.value.trim() === ''){
    textbox.textContent = 'X Blank Values are not allowed'
    textbox.className = 'invalid-feedback'
    cpassword.style.border = '2px solid red'
  }else if(cpassword.value!=password.value){
    textbox.textContent = 'Password Does not Match'
    textbox.className = 'invalid-feedback'
    cpassword.style.border = '2px solid red'
    
  }else{
    textbox.textContent = '✔'
    textbox.className = 'valid-feedback'
    cpassword.style.border = '2px solid green'
  }
}


document.getElementById("name").addEventListener("input",function(){
  nameCheck();
})

document.getElementById("password").addEventListener("input",function(){
  passwordCheck();
})


document.getElementById("email").addEventListener("input",function(){
  emailCheck();
})

document.getElementById("cpassword").addEventListener("input",function(){
  finalPassword();
})

dobField.addEventListener("input",function(){
  validateAge();
})

console.log("Hello World")