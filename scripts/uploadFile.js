import { avatarInput, validateAvatar, toggleError } from "./form.js";

//Upload file
export const imgPreview = document.querySelector('.img-preview img');
const removeImgButton = document.getElementById('remove-img-button');
const changeImgButton = document.getElementById('change-img-button');

const setAvatar = isUploading => {
  const dropAreaInstructions = document.querySelector('.drop-area-instructions');
  const dropAreaButtonContainer = document.querySelector('.drop-area-button-container');

  if(isUploading) {
    imgPreview.src = URL.createObjectURL(avatarInput.files[0]);;
    imgPreview.classList.add('full-size');
    validateAvatar();
  } else {
    avatarInput.value = '';
    imgPreview.src = './assets/images/icon-upload.svg';
    imgPreview.classList.remove('full-size');
    toggleError(avatarInput, false);
  }

  dropAreaInstructions.hidden = isUploading;
  dropAreaButtonContainer.hidden = !isUploading;
}

document.addEventListener('DOMContentLoaded', () => {
  avatarInput.addEventListener('change', () => setAvatar(true));
  removeImgButton.addEventListener('click', () => setAvatar(false));
  changeImgButton.addEventListener('click', () => avatarInput.click());
});

//Drag and drop
const dropArea = document.querySelector('.drop-area');

dropArea.addEventListener('dragover', e => e.preventDefault());
dropArea.addEventListener('drop', e => {
  e.preventDefault();
  const dt = new DataTransfer();
  dt.items.add(e.dataTransfer.files[0]);
  avatarInput.files = dt.files;
  setAvatar(true);
});