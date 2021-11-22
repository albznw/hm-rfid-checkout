const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { randomUUID } = require("crypto");

const enableScanner = false;
if (enableScanner) {
  const HID = require("node-hid");

  // Print connected HID devices
  // console.log("Connected HID devices", HID.devices());

  const vid = 6790
  const pid = 57360

  const scanner = new HID.HID(vid, pid);
  if (scanner) {
    console.log("Connected to scanner");
  }
}


let win; // avoids being garbage collected

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // fullscreen: true,
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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

app.whenReady().then(() => {

  // Console log data from the scanner as it comes in
  if (enableScanner) {
    scanner.on("data", (data) => {
      console.log(data);
    });
  }

  win.webContents.on("did-finish-load", () => {
    console.log("Sending msg");
    win.webContents.send("msg", "Startup message from electron backend");

    // setTimeout(() => {
    //   setInterval(() => {
    //     win.webContents.send("msg", randomUUID());
    //   }, 800);
    // }, 2000);
  });
});