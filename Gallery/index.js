const clickableImages = document.querySelectorAll('.img-left img')
console.log(clickableImages)

const previewImage = document.querySelector('.img-middle img')

for (let i = 0; i < clickableImages.length; i++) {
  clickableImages[i].addEventListener('click', (e) => findPreviewImage(e))
}

const findPreviewImage = (e) => {
  previewImage.src = e.target.src
  previewImage.classList.add('animate')

  setTimeout(() => {
    previewImage.classList.remove('animate')
  }, 500)
}
