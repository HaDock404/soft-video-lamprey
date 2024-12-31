const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true, // Supprime la barre supérieure
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Chargez l'application React
    const startUrl = `file://${path.join(__dirname, 'frontend', 'build', 'index.html')}`;
    console.log('Loading URL:', startUrl);

    mainWindow.loadURL(startUrl);

    // Ouvrir les DevTools
    //mainWindow.webContents.openDevTools();

    // Gestion des événements de chargement
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Page loaded successfully');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.log('Failed to load:', errorDescription);
    });

    mainWindow.webContents.on('console-message', (level, message) => {
        console.log(`Console message [${level}]: ${message}`);
    });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});