const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function isValidEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    console.log("email Valid");
  } else {
    showError(input, "Email not Valid");
    console.log("email Not Valid");
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function getFieldName(input) {
  return input.split("")[0].toUpperCase() + input.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      //trim() method removes white spaces on both ends of the string.
      showError(input, `${getFieldName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input.id)} can only have ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function passwordMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords do not Match");
  } else {
    showSuccess(pass2);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 4, 15);
  checkLength(password, 4, 8);
  isValidEmail(email);
  passwordMatch(password, password2);
});
