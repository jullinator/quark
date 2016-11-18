import {BrowserWindow} from 'electron'

export default ()=>{
  let Window = new BrowserWindow({width: 800, height: 600});
  Window.loadURL('file://' + __dirname + '/index.html');
  Window.on('closed', () => {
    Window = null;
  });
  return Window
}
