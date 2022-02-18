const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let addWindow;
let mainWindow;

console.log(path.join(__dirname, 'preload.js'));

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  await mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

async function handleCreateWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 150,
    title: 'Add Item'
  });

  await addWindow.loadFile('addWindow.html');

  addWindow.on('close', () => {
    addWindow = null;
  })
}

ipcMain.on('item:add', (event, title) => {
  console.log(event);
  console.log('title', title);
});

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add item',
        async click() {
          await handleCreateWindow();
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If Mac add empty item to menu
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(item, focuseWindow) {
          focuseWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});