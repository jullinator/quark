'use babel';

import React from 'react';
import {ipcRenderer} from 'electron'
import {Button, TextInput, Window} from 'react-desktop/windows'
import Fire from '../lib/fire-stove'
import {observer} from 'mobx-react'
import './hello.styl'


@observer
export default class Main extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(Fire.tables).map(name=>{
          return `Table: ${name}
          `
        })}
      </div>
    )
  }
}
function renderDb (){
  const cb = res =>{
    let json = JSON.stringify(res.val())
    view.root = <h4>{json}</h4>
  }
  database.ref().once('value',cb)

}

const renderSome = text=> (e={}) =>{
  view.root = (
    <div>
      <input
          placeholder="renderSome"
          value=""
          onChange={renderInput(text)}/>
      {text}
    </div>
  )
}
const renderInput = text => (e)=>{
  let {value} = e.target
  switch (value) {
    case '@': firstRoute();
    case '$': renderDb();
    default: renderSome(value + text)()
  }

}

function firstRoute (){
    view.root = (<h2  onClick={renderSome("")}> first route </h2>)
}
firstRoute()
