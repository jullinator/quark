import Table from './Table'

class Fire {
  tables = {}
  Tables(name, fields, config={}){
    this.tables[name] = new Table(name, fields, config)
  }

  Methods(...methods){

  }
  Create(tableName, fields){
    if(this.tables[tableName]){
      this.tables[tableName].create(fields)
    } else{
      console.log(`${tableName} does not exist`)
    }
  }
  Update(tableName, fields, ){
    if(this.tables[tableName]){
      this.tables[tableName].create(fields)
    } else{
      console.log(`${tableName} does not exist`)
    }
  }
}
