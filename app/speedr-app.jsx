'use babel';
import './tables-file'
import React from 'react';
import {observer} from 'mobx-react'
import {extendObservable} from 'mobx'
import Fire from './lib/fire-stove'
import {database} from './lib/database'
import _ from './_.jsx'
import Emitter from 'events'

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


Fire.Tables('route/read',{
  text: '',
  index:0,
  loopAction:'play',
  loopActions: ['play', 'pause'],
  loopInterval: 200,
  playing: false,
  shouldPlay: false
})



/* APP LISTENER, AND SOME ROUTING EVENTS AND METHODS */
app.on('route/read/strunt', ()=>{
  let props = {text: `det var en gång en liten fågel, ja en fågel han bodde på landet, och roger hette han. Han ville gärna leka.`}
  app.emit('route/read', props)
})
app.on('route/read', ( props={} )=>{
  let text = `Dixons initiativ möttes av jubel från publiken. Hela ensemblen stod kvar på scenen – bland dem huvudrollsinnehavaren Javier Munoz, som är homosexuell och hiv-positiv. Han har varit öppen med sin sjukdom i flera års tid för att dra uppmärksamhet till hur det är att leva med hiv.
              Brandon Dixon fortsatte, riktad mot Pence:– Vi tackar dig för att du delar den här fantastiska amerikanska berättelsen, berättad av en mångfaldig grupp av män och kvinnor av olika färger, övertygelser och läggningar.`

  const defaultProps = {
    text,
    index:0,
    loopAction:'play',
    loopActions: ['play', 'pause'],
    loopInterval: 200,
    playing: false,
    shouldPlay: false,
    onLoadSession: function(){},
    append: false
  }

  app.emit('render/read', Object.assign(defaultProps, props))
})

app.on('read/inc', ({props})=>{
  props.index ++
  app.emit('render/read', props)
})
app.on('read/dec', ({props})=>{
  props.index --
  app.emit('render/read', props)
})
app.on('read/reset', ({props})=>{
  props.index = 0
  app.emit('render/read', props)
})

app.on('read/toggle-loop', ({props})=>{
  app.emit(`read/${props.loopAction}`, {props})
})

app.on('read/change-interval', ( {props, e} )=>{
  const {value} = e.target
  if(value < 50){
    props.loopInterval = 50
  } else if (value > 1000){
    props.loopInterval = 1000
  } else {
    props.loopInterval = value
  }

  app.emit('render/read', props)
})

app.on('read/play', ({props})=>{
  props.playing = true
  props.shouldPlay = true
  props.loopAction = 'pause'
  app.emit('render/read', props)
})
app.on('read/pause', ({props})=>{
  props.playing = false
  props.loopAction = 'play'
  app.emit('render/read', props)
})
app.on('read/loop', ({props})=>{
  setTimeout(()=>{
    props.shouldPlay = true;
    app.emit('render/read', props)

  }, props.loopInterval)
})

// SAVE // LOAD SSESSION STATE
app.on('read/save' , ( {props} )=>{
  let savedProps = Object.assign({}, props)
  props.onLoadSession = ({onLoadSession}) =>{
    savedProps.onLoadSession = onLoadSession
    app.emit('render/read', savedProps )
    console.log(props)
  }
  app.emit('render/read', props)
})

app.on('read/append' , ({props}) =>{
  props.append = props.append ? false : true
  app.emit('render/read', props)
})
/*  RENDER READ */
app.on('render/read', (props)=>{
  const
        dec = app.dispatch('read/dec', {props}),
        inc = app.dispatch('read/inc', {props}),
        reset = app.dispatch('read/reset', {props}),
        toggleLoop = app.dispatch('read/toggle-loop', {props}),
        changeInterval = app.dispatch('read/change-interval', {props});


  if(props.shouldPlay && props.playing){
    props.shouldPlay = false
    app.emit('read/loop', {props})
    app.emit('read/inc', {props})
  }
  const   save = app.dispatch('read/save', {props})
  const   load = ()=> props.onLoadSession(props)
  const   append = app.dispatch('read/append', {props})

  view.content = (
    <div>
      {props.append ? view.content : null}
      <button onClick={append}> {props.append ? 'Stop Append' : 'Append'} </button>
      <h2>{props.index}</h2>
      <h4>{props.text.split(' ')[props.index]}</h4>
      <button onClick={dec}>DEC</button>
      <button onClick={reset}>RESET</button>
      <button onClick={inc}>INC</button>
      <button onClick={toggleLoop}>{props.loopAction}</button>
      <input min="20" max = "1000"
            step="100" type="number"
            value={props.loopInterval}
            onChange={changeInterval} />
      <button onClick={save}> Save Session </button>
      <button onClick={load}> Load Session </button>
    </div>
  )
})


/* RENDER APP*/
export default observer(()=> (
  <div>
    {view.top}
    {view.content}
  </div>
))
