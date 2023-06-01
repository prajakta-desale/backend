import BaseModel from "../BaseModel";

export class UserModel extends BaseModel   {
    constructor() {
        super();
    }
    async getUser(data:any){
        let results = await this._executeQuery("select id,email,password from users where email = ? ", [data.email]);
        return results;
    }
    async createUser(userData:any){
        let registerResult = await this._executeQuery("insert into users set ?",[userData]);
        return registerResult;
    }
    async getRole(name:any){
        let role = await this._executeQuery(" select id,name from user_roles where name = ?",[name]);
        return role;
    }
    // 'UPDATE users SET reset_token = $1, reset_token_expires_at = $2 WHERE email = $3',
    //   [resetToken, resetTokenExpiration, email]
    async setResetToken(data:any){
        let query = await this._executeQuery("update users set reset_token = ? , token_expire = ? where email = ? ",[data.reset_token, data.token_expire,data.email]);
        // console.log("query result in model------------->", query)
        return query 
    }
}
