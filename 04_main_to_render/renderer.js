const counter = document.getElementById('counter');

window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue;
  console.log(event);
  event.reply('counter-value', newValue);
});
