import Emitter from 'events'

export default zapp = new Emitter()

zapp.dispatch = ( event, payload= {} ) => ( e =  {} ) =>  {

  payload.e = e
  app.emit(event, payload)

}
