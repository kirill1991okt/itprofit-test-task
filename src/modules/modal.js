function openModal(
  modalSelector,
  blockSelector,
  text = 'Fill the form, please!'
) {
  const modal = document.querySelector(modalSelector),
    block = document.querySelector(blockSelector);
  modal.classList.add('show');
  modal.classList.remove('close');
  document.body.style.overflow = 'hidden';
  block.innerText = text;
}

function closeModalWindow(
  modalSelector,
  blockSelector,
  text = 'Fill the form, please!'
) {
  const modal = document.querySelector(modalSelector),
    block = document.querySelector(blockSelector);
  modal.classList.add('close');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  block.innerText = text;
}

function modal(btnSelector, modalSelector, blockSelector) {
  const modalBtn = document.querySelector(btnSelector),
    modal = document.querySelector(modalSelector);

  modalBtn.addEventListener('click', () =>
    openModal(modalSelector, blockSelector)
  );

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModalWindow(modalSelector, blockSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModalWindow(modalSelector, blockSelector);
    }
  });
}

modal('.modal-btn', '.modal', '.modal__text');

export default openModal;
