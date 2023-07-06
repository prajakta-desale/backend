import baseModel from "../BaseModel";
export class UserModel extends baseModel {
  constructor() {
    super();
  }

  async getUser(data: any) {
    return await this._executeQuery(
      "select id,role_id,concat(first_name, last_name)as username, email, password,status from user where email = ?  ",
      [data.email]
    );
  }
  async getUserRole(role: string) {
    let result = await this._executeQuery(
      "select id,name, status from user_roles where name = ? ",
      [role]
    );
    return result;
  }

  async createUser(userData: any, tableName: string) {
    let registerResult = await this._executeQuery(
      `INSERT INTO ${tableName} SET ?`,
      [userData]
    );
    return registerResult;
  }
  // async userLogin(data: any) {
  //   let role, tableName;
  //   tableName = "users";
  //   const userQueryResult = await this._executeQuery(
  //     "SELECT id,concat(first_name, last_name)as username,email, password,status FROM " +
  //       tableName +
  //       " WHERE email = ?",
  //     [data.email]
  //   );
  //   if (userQueryResult.length !== 0) {
  //     userQueryResult[0].role = "user";
  //     return userQueryResult;
  //   } else {
  //     // Check the admin table
  //     tableName = "admin";
  //     const adminQueryResult = await this._executeQuery(
  //       "SELECT id,concat(first_name, last_name)as username, email, password, status FROM " +
  //         tableName +
  //         " WHERE email = ?",
  //       [data.email]
  //     );
  //     if (adminQueryResult.length !== 0) {
  //       adminQueryResult[0].role = "admin";
  //       return adminQueryResult;
  //     } else {
  //       // Check the vendor table
  //       tableName = "vendors";
  //       const vendorQueryResult = await this._executeQuery(
  //         "SELECT id,concat(first_name, last_name)as username, email, password,status FROM " +
  //           tableName +
  //           " WHERE email = ? ",
  //         [data.email]
  //       );
  //       if (vendorQueryResult.length !== 0) {
  //         vendorQueryResult[0].role = "vendor";
  //         return vendorQueryResult;
  //       } else {
  //         // Check the driver table
  //         tableName = "drivers";
  //         const driverQueryResult = await this._executeQuery(
  //           "SELECT id,concat(first_name, last_name)as username, email, password,status FROM " +
  //             tableName +
  //             " WHERE email = ? ",
  //           [data.email]
  //         );
  //         if (driverQueryResult.length !== 0) {
  //           driverQueryResult[0].role = "driver";
  //           return driverQueryResult;
  //         }
  //         return driverQueryResult;
  //       }
  //     }
  //   }
  // }
}
