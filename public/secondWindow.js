const { BrowserWindow } = require('electron');
const path = require("path");

class SecondWindow extends BrowserWindow {
  constructor(coordinates, isDev) {
    super({
      x: coordinates.x,
      y: coordinates.y
    })
    this.loadURL(
      isDev
      ? "http://localhost:3000/#/about"
      : `file://${path.join(__dirname, "../build/index.html#/about")}`
    );
    this.setFullScreen(true);
  }
}

module.exports = SecondWindow;