const form = document.querySelector('form');
const item = document.getElementById('item');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(item.value);
  console.log(window);
});


