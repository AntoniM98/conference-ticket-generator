import { renderTicket } from "./ticket.js";

//Upload Avatar
export const nameInput = document.getElementById('name');
export const emailInput = document.getElementById('email');
export const githubInput = document.getElementById('github');
export const avatarInput = document.getElementById('avatar');
avatarInput.value = '';

const formValidity = {
  avatar: false,
  name: false,
  email: false,
  github: false
};

/*const validateInput = () => {
  let isValid = false;
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const githubValue = githubInput.value.trim();
  const avatarValue = avatarInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const githubRegex = /^@[a-zA-Z0-9_-]+$/;

  if(nameValue === '') {
    toggleError(nameInput, true);
    formValidity.name = false;
  }
  else {
    toggleError(nameInput, false);
    formValidity.name = true;
  }

  if(!emailRegex.test(emailValue)) {
    toggleError(emailInput, true);
    formValidity.email = false;
  }
  else {
    toggleError(emailInput, false);
    formValidity.email = true;
  }

  if(!githubRegex.test(githubValue)) {
    toggleError(githubInput, true);
    formValidity.github = false;
  }
  else {
    toggleError(githubInput, false);
    formValidity.github = true;
  }

  validateAvatar();
  return isValid;
}*/
/*const validateInput = input => {
  const inputValue = input.value.trim();

  switch (input) {
    case avatarInput:
      validateAvatar();
      break;
    case nameInput:
      if(inputValue === '') {
        toggleError(input, true);
        formValidity.name = false;
      }
      else {
        toggleError(input, false);
        formValidity.name = true;
      }
      break;
    case emailInput:
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(inputValue)) {
        toggleError(input, true);
        formValidity.email = false;
      }
      else {
        toggleError(input, false);
        formValidity.email = true;
      }
      break;
    case githubInput:
      const githubRegex = /^@[a-zA-Z0-9_-]+$/;
      if(!githubRegex.test(inputValue)) {
        toggleError(input, true);
        formValidity.github = false;
      }
      else {
        toggleError(input, false);
        formValidity.github = true;
      }
      break;
    default:
      break;
  }
}*/

const validateInputs = () => {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const githubValue = githubInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const githubRegex = /^@[a-zA-Z0-9_-]+$/;

  validateAvatar();

  if(nameValue === '') {
    toggleError(nameInput, true);
    formValidity.name = false;
  } else {
    toggleError(nameInput, false);
    formValidity.name = true;
  }
  
  if(!emailRegex.test(emailValue)) {
    toggleError(emailInput, true);
    formValidity.email = false;
  } else {
    toggleError(emailInput, false);
    formValidity.email = true;
  }
  
  if(!githubRegex.test(githubValue)) {
    toggleError(githubInput, true);
    formValidity.github = false;
  } else {
    toggleError(githubInput, false);
    formValidity.github = true;
  }
}

export const validateAvatar = () => {
  let uploadedFileType = '';
  let uploadedFileSize = 0;

  if(avatarInput.files.length > 0) {
    uploadedFileType = avatarInput.files[0].type;
    uploadedFileSize = avatarInput.files[0].size;
  }

  if(uploadedFileType === '') {
    toggleError(avatarInput, true, 'empty');
    formValidity.avatar = false;
    console.log('no file');
  }
  else if(uploadedFileSize >= 500000) {
    toggleError(avatarInput, true, 'size');
    formValidity.avatar = false;
    console.log(`too large file: ${uploadedFileSize}`);
  }
  else if(uploadedFileType !== 'image/jpeg' && uploadedFileType !== 'image/png') {
    toggleError(avatarInput, true, 'type');
    formValidity.avatar = false;
    console.log(`invalid type: ${uploadedFileType}`);
  }
  else if(uploadedFileType === 'image/jpeg' || uploadedFileType === 'image/png') {
    toggleError(avatarInput, false);
    formValidity.avatar = true;
    console.log(`valid file`);
  }
}

export const toggleError = (input, hasError, errorType) => {
  const errorMessage = document.getElementById(`${input.id}-error`);
  const instructions = document.querySelector('.upload-instructions');

  errorMessage.hidden = !hasError;

  if(input === avatarInput) {
    instructions.hidden = hasError;
    if(errorType === 'empty') errorMessage.textContent = 'File missing. Please upload a photo.';
    else if(errorType === 'size') errorMessage.textContent = 'File too large. Please upload a photo under 500KB.';
    else if(errorType === 'type') errorMessage.textContent = 'Wrong file type. Please upload a JPG or PNG file';
    return;
  }

  if(hasError) input.classList.add('error');
  else input.classList.remove('error');
}

const form = document.getElementById('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  validateInputs();
  const validForm = Object.values(formValidity).every(input => input === true);
  console.log(formValidity);
  if(validForm) renderTicket();
});

const inputFields = document.querySelectorAll('.input-field');
inputFields.forEach(input => {
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
      e.preventDefault();
      if(input.classList.contains('drop-area')) avatarInput.click();
      e.target.blur();
    }
  });
});