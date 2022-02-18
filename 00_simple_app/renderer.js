const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
const item = document.getElementById('item');

function submitForm(e) {
  e.preventDefault();
  console.log('ER', window.electronAPI);
}


