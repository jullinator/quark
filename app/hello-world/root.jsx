'use babel';

import React from 'react';
import {ipcRenderer} from 'electron'
import {Button, TextInput, Window} from 'react-desktop/windows'

const testIpc = (e) =>{
  ipcRenderer.send('test', e.target.name)
}

export default class Main extends React.Component {
  render() {
    return (
      <Window
        height="300px">
        <TextInput label="name" />
        <TextInput label="extension" />
        <Button push
          onClick={testIpc}
          name="new-window"
          id="button-add-window"
          >
          New Window
        </Button>
      </Window>
    )
  }
}
