
import baseModel from "../BaseModel";

export class AdminModel extends baseModel{
    constructor()
    {
        super();
    }

    async getAdmin( data : any ){
        return await this._executeQuery( "select id,user_role_id,email, concat(first_name,' ', last_name) as username, status from user where email = ? and password = ? ", [data.email, data.password])
    }
}