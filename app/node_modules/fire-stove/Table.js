import {database} from 'database'

export default class{
  name = ''
  fields: {

  }
  config = {
    path:''
  }


  constructor(name, fields, config){
      //could check if config.path exists
      this.name = name
      this.config.path = name
      Object.assign(this.config, config)
      this.fields = fields
  }
  create(fields){
    const values = Object.assign({}, this.fields, fields)
    database.ref(this.config.path).push(values)
  }
}
