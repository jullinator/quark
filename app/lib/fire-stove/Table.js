import {database} from '../database'

export default class{
  _setupDb = ()=>{
    this.ref = database.ref(this.config.path)
  }
  name = ''
  fields: {}
  config = {
    path:''
  }

  constructor(name, fields, config){
      //could check if config.path exists
      this.name = name
      this.config.path = name
      Object.assign(this.config, config)
      this.fields = fields
      this._setupDb()
  }

  push(fields){
    const values = Object.assign({}, this.fields, fields)
    let _id = this.ref.push(values).key
    this.ref.child(`${_id}/_id`).set(_id)
  }
  create = (name, fields) => {
    const values = Object.assign({}, this.fields, fields)
    values._id = name
    this.ref.child(name).set(values)
  }


}
