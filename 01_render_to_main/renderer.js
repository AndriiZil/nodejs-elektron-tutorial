const setButton = document.getElementById('btn');
const titleInput = document.getElementById('title');

setButton.addEventListener('click', () => {
  const title = titleInput.value;

  console.log('WINDOW', window);
  console.log(window.electronAPI);

  window.electronAPI.setTitle(title)
});
