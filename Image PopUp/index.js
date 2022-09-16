// Select required html elements
const smallImages = document.querySelectorAll('.image-container img');
const imagePopup = document.querySelector('.image-popup');
const fullImage = document.querySelector('.full-image');
const body = document.body;

// add event listener and apply class accordingly
for (let i = 0; i < smallImages.length; i++) {
  smallImages[i].addEventListener('click', () => {
    imagePopup.classList.add('show');
    fullImage.classList.add('show');
    body.style.overflow = 'hidden';
    const getImgAttribute = smallImages[i].getAttribute('alt');
    fullImage.src = `Images/full/${getImgAttribute}.jpg`;
  });
}

// add event listener and removes class accordingly

imagePopup.addEventListener('click', () => {
  imagePopup.classList.remove('show');
  fullImage.classList.remove('show');
  body.style.overflow = 'auto';
});

// to stop propogation so that when user click inside  image popup , the popup won't close but click outside it , close the image popup
fullImage.addEventListener('click', (e) => {
  e.stopPropagation();
});
