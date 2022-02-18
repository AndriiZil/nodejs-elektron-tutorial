const electron = require('electron');

const form = document.querySelector('form');

console.log(form);
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const item = document.querySelector('#item').value;
  electron.ipcRenderer.send('item:add', item);
}
