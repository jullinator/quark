'use babel';

import React from 'react';
import {observer} from 'mobx-react'
import {extendObservable} from 'mobx'
import Fire from './lib/fire-stove'
import {database} from './lib/database'
import _ from './_.jsx'
import Emitter from 'events'
//Ace imports
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/theme/github';


/*APP INIT */
const app = new Emitter()
app.dispatch = (event, payload={} ) => ( e={} ) =>{
  payload.e = e
  app.emit(event, payload)
}



/* VIEW DECLARATION */
let view = {};
extendObservable(view,{
  top: <h2> Top</h2>,
  content: <div>content </div>
})

view.top = (
  <div>
    <button onClick={app.dispatch('route/read')} > Read Trump </button>
    <button onClick={app.dispatch('route/read/strunt')} > Read Strunt </button>
  </div>
)

/* DB INIT*/
Fire.Tables('components/editor',{
  name:'unique-id',
  mode:'javascript',
  theme:'github',
  value:''
})
//One Time init
const editorStore = Fire.Table('components/editor')


const initEditor = () =>{
  editorStore.ref.child('test1').once('value',res=>{
    let props = res.val()
    app.emit('render/editor', props)
  })
}
initEditor()

editorStore.ref.child('test1').on('value',res=>{
  let props = res.val()
  app.emit('render/editor', props)
})
/* DB INIT*/

/*DB METHODS, listen to APP*/



/*DB METHODS, listen to APP*/

/* APP LISTENER, AND SOME ROUTING EVENTS AND METHODS */
app.on('editor/value', ({props, value})=>{
  props.value = value
  editorStore.ref.child(props._id).set(props)
})



/* APP LISTENER, AND SOME ROUTING EVENTS AND METHODS */

/*  RENDER Editor */
app.on('render/editor', (props)=>{

  const updateValue = (value) => app.emit('editor/value', {
    value,
    props
  })

  view.content = (
    <div>
    <AceEditor
            onChange={updateValue}
            value = {props.value}
            mode = {props.mode}
            theme = {props.theme}
            name = {props._id}
            />

    </div>
  )
  /*

      <textarea
        onChange = {updateValue}
        value = {props.value}
        />    */
})


/* RENDER APP*/
export default observer(()=> (
  <div>
    {view.top}
    {view.content}
  </div>
))
