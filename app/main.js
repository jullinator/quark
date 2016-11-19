import { app, BrowserWindow, ipcMain} from 'electron';
import MainWindow from './main-window'

app.on('ready', () => {
  let window = MainWindow()
  let window2 = MainWindow()
});

















//donno what this is
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
