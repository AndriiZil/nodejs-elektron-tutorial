const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

console.log(path.join(__dirname, 'preload.js'));

function createWindow () {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('set-title', (event, title) => {
        console.log('title', title);
    });

    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})