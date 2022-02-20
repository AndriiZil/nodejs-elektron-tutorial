const cpu = document.getElementById('cpu');
const mem = document.getElementById('mem');
const totalMem = document.getElementById('total-mem');

console.log(totalMem);

window.electronAPI.handleCpu((event, value) => {
  cpu.innerText = value.toFixed(2);
});

window.electronAPI.handleMem((event, value) => {
  mem.innerText = value.toFixed(2);
});

window.electronAPI.handleTotalMem((event, value) => {
  totalMem.innerText = value.toFixed(2);
});
