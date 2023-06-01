import { AdminModel } from "../Models/Admin/Admin.model";
import Encryption from "../utilities/Encryption";

const userLogin = async ( data : any ) => {
    try{
        let result = await new AdminModel().userLogin(data)
        console.log("in service login result---------------------->", result);
        if (result.length === 0 ) throw new Error( "Invalid email or password" )
        const match = await new Encryption().verifypassword(data.password,result[0].password);
        if(!match) throw new Error("Invalid password");
        delete result[0].password;
        if (result[0].status !== 1 ) throw new Error( "Your account is not active" );
        return {
            token : await Encryption.generateJwtToken( { id : result[0].id }),
            user :  result
        }; 
    }
    catch(error:any){
        console.log('error:', error.message);
        return error
    }
}

const createUser = async (data : any) => {
    try{
    let tableName;
    switch (data.role) {
      case 'user':
        tableName = 'users';
        break;
      case 'admin':
        tableName = 'admin';
        break;
      case 'vendor':
        tableName = 'vendors';
        break;
      case 'driver':
        tableName = 'drivers';
        break;
      default:
        return ({ error: 'Invalid role' });
    }
    if(data.password!==data.confirm_password) throw new Error("password did not match");
    let hash = await new Encryption().generateHash(data.password, 10);
    data.password = hash;
    delete data.confirm_password;
    delete data.role
    let user = await new AdminModel().createUser(data, tableName);
    return user;
    }
    catch(error:any){
        throw error;

    }
};
export default {
    userLogin,
    createUser
}