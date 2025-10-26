const { app, BrowserWindow } = require('electron');
const path = require('path');

// تنظیم محیط توسعه
if (require('electron-is-dev')) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

require('./electron');

// جلوگیری از اجرای چندین نمونه
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // اگر برنامه در حال اجراست، پنجره رو فعال کن
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}