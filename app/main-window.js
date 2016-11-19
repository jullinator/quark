import {BrowserWindow} from 'electron'

export default ()=>{
  let Window = new BrowserWindow({width: 1200, height: 1000});
  Window.loadURL('file://' + __dirname + '/main-window.html');
  Window.on('closed', () => {
    Window = null;
  });
  return Window
}
