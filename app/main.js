import { app, BrowserWindow, ipcMain} from 'electron';
import HelloWorld from './hello-world/server'

ipcMain.on('test', (event, payload)=>{
  console.log(payload)
  let window = HelloWorld()
})




app.on('ready', () => {
  let window = HelloWorld()
});

















//donno what this is
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
