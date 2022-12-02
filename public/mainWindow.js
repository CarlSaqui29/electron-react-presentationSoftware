const { BrowserWindow } = require('electron');
const path = require("path");

class MainWindow extends BrowserWindow {
  constructor (file, isDev) {
    super({
      width: 1200, 
      height: 800,
      webPreperences: {
        nodeIntegration: true
      }
    })
    this.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, `${file}`)}`
    );
  }
}

module.exports = MainWindow;