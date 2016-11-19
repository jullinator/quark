import Table from './Table'
import {observable} from 'mobx'

class Fire {
  @observable tables = {}


  Tables (name, fields, config={}){
    this.tables[name] = new Table(name, fields, config)
  }
  Table = (name) => this.tables[name]

  Methods (...methods){

  }
  Create(tableName, fields){
    if(this.tables[tableName]){
      this.tables[tableName].create(fields)
    } else{
      console.log(`${tableName} does not exist`)
    }
  }

}

export default new Fire()

export const Objekt = {
  fields(objekt){

  }
}
