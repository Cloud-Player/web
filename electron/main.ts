'use strict';
const myElectron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow : any;

myElectron.app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    myElectron.app.quit();
  }
});

myElectron.app.on('ready', function() {

  mainWindow = new myElectron.BrowserWindow({ width: 1200, height: 750 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
