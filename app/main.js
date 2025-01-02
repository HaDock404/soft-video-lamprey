const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

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
    const startUrl = `file://${path.join(__dirname, '..', 'frontend', 'build', 'index.html')}`;
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

ipcMain.on('start-video', (event) => {
  const pythonPath = path.join(__dirname, '..', 'python_env', 'bin', 'python');
  const pythonScript = path.join(__dirname, '..', 'python', 'script.py');

  const pythonProcess = spawn(pythonPath, [pythonScript]);

  let buffer = '';

  pythonProcess.stdout.on('data', (data) => {
    buffer += data.toString(); // Accumuler les données reçues

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf('\n')) > -1) {
      const message = buffer.slice(0, newlineIndex); // Extraire le message complet
      buffer = buffer.slice(newlineIndex + 1); // Supprimer le message traité

      try {
        const parsedMessage = JSON.parse(message); // Parse du JSON
        if (parsedMessage.type === 'frame') {
          event.sender.send('video-frame', parsedMessage.data);
        } else if (parsedMessage.type === 'error') {
          console.error('Python error:', parsedMessage.data);
          event.sender.send('video-error', parsedMessage.data);
        }
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Python stderr:', data.toString());
  });

  pythonProcess.on('exit', (code) => {
    console.log('Python process exited with code:', code);
  });
});

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