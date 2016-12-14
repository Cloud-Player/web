'use strict';

const electron : Electron.ElectronMainAndRenderer = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;

var mainWindow : Electron.BrowserWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () =>  {
    mainWindow = null;
  });
});

ipcMain.on('message', (event, arg) => {
  console.log(`Received ${arg}`);
  event.sender.send("reply", "pong");
});
