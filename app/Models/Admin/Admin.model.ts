
import baseModel from "../BaseModel";

export class AdminModel extends baseModel{
    constructor()
    {
        super();
    }

    async getAdmin( data : any ){
        return await this._executeQuery( "select id,role_id,email, concat(first_name,' ', last_name) as username, status from admin where email = ? and password = ? ", [data.email, data.password])
    }
    // async getLogin(email:any,password:any){
    // let tableName = "admin"
    // const queryResult = await this._executeQuery('SELECT id, email, password FROM ' + tableName + ' WHERE email = ?', [email]);
    // return queryResult
    // // const user = queryResult.rows[0];
    // }
    

    // Check the user table
    async userLogin(data:any){
    let role, tableName;
    tableName = 'users';
    const userQueryResult = await this._executeQuery('SELECT id,concat(first_name, last_name)as username,email, password,status FROM ' + tableName + ' WHERE email = ?', [data.email]);
    if (userQueryResult.length !== 0) {
        userQueryResult[0].role = 'user';
      return userQueryResult
    } else {
      // Check the admin table
      tableName = 'admin';
      const adminQueryResult = await this._executeQuery('SELECT id,concat(first_name, last_name)as username, email, password, status FROM ' + tableName + ' WHERE email = ?', [data.email]);
      if (adminQueryResult.length !== 0) {
        adminQueryResult[0].role = 'admin';
        return adminQueryResult
      } else {
        // Check the vendor table
        tableName = 'vendors';
        const vendorQueryResult = await this._executeQuery('SELECT id,concat(first_name, last_name)as username, email, password,status FROM ' + tableName + ' WHERE email = ? ', [data.email]);
        if (vendorQueryResult.length !== 0) {
            vendorQueryResult[0].role = 'vendor';
          return vendorQueryResult
        } 
        else {
          // Check the driver table
          tableName = 'drivers';
          const driverQueryResult = await this._executeQuery('SELECT id,concat(first_name, last_name)as username, email, password,status FROM ' + tableName + ' WHERE email = ? ', [data.email]);
          if (driverQueryResult.length !== 0) {
            driverQueryResult[0].role = 'driver';
            return driverQueryResult
          }
          return driverQueryResult
        }
      }
    }
}
async createUser(userData:any, tableName:string){
  console.log('in model ---------> data', userData)
  let registerResult = await this._executeQuery(`INSERT INTO ${tableName} SET ?`,[userData]);
  return registerResult;
}
}