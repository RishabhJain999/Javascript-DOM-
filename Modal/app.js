const openModal = document.querySelector('.open');
const modalContainer = document.querySelector('.modal-container');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

openModal.addEventListener('click', () => {
  modalContainer.classList.add('show');
});

modalContainer.addEventListener('click', (e) => {
  modalContainer.classList.remove('show');
});

modal.addEventListener('click', (e) => {
  e.stopPropagation();
});
modalClose.addEventListener('click', () => {
  modalContainer.classList.remove('show');
});
