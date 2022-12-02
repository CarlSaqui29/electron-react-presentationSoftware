const { app, BrowserWindow, screen } = require('electron');
const MainWindow = require('./mainWindow');
const SecondWindow = require('./secondWindow');

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

// initialize windows
let mainWindow;
let secondWindow;

const createMainWindow = () => {
  mainWindow = new MainWindow('../build/index.html', isDev);
  mainWindow.on("closed", () => (mainWindow = null));
}

const createSecondWindow = (x,y) => {
  secondWindow = new SecondWindow({ x, y }, isDev);
}

// app.on("ready", createWindow);
app.whenReady().then(() => {
  // display main window
  createMainWindow();
    
  // get the displays if there is 2nd monitor
  const displays = screen.getAllDisplays();
  // set the external positin values
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  
  if (externalDisplay) {
    let x = externalDisplay.bounds.x + 50;
    let y = externalDisplay.bounds.y + 50;
    createSecondWindow(x,y);
  }
})


// mac configurations
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
})
  
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
})
