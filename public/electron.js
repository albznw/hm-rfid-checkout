const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { randomUUID } = require("crypto");
const tds = require("epc-tds");

// Set configurable variables
const enableScanner = true;
const epcStart = 18;
const epcEnd = 31;
const vid = 6790
const pid = 57360

// Declare used variables
let scanner; // declare scanner
let win; // avoids being garbage collected

// Enable and connect to scanner
if (enableScanner) {
  const HID = require("node-hid");

  // Print connected HID devices
  // console.log("Connected HID devices", HID.devices());

  scanner = new HID.HID(vid, pid);
  if (scanner) {
    console.log("Connected to scanner");
  }
}


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    fullscreen: true,
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

function toHexString(byteArray) {
  return byteArray.reduce((output, elem) => 
    (output + ('0' + elem.toString(16)).slice(-2)), '');
}

function calcChecksum(data) {
  let u_sum = 0;
  data.forEach(x => {
    u_sum += x;
  });
  u_sum = ((~u_sum) + 1) & 0xFF;
  return u_sum;
}

function handleScanData(data) {
  const frameLength = data[0];
  const payload = data.slice(1,frameLength);
  const checksumVal = data.slice(frameLength, frameLength + 1);

  if (checksumVal[0] === calcChecksum(payload)) {
    const epcPayload = payload.slice(epcStart, epcEnd);
    const gs2 = tds.valueOf(toHexString(epcPayload));  // Decode EPC
    return gs2.toBarcode();  // Return SGTIN
  }
  return null;
}

app.whenReady().then(() => {

  // Console log data from the scanner as it comes in
  if (enableScanner) {
    scanner.on("data", (data) => {
      console.log("Handling scan");
      const sgtin = handleScanData(data);
      if (sgtin) {
        win.webContents.send("new-scan", sgtin);
        console.log("Tag scanned!");
      } else {
        console.log("Scan failed");
      }
    });
  }

});