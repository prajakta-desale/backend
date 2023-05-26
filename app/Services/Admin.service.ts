import { AdminModel } from "../Models/Admin/Admin.model";
import LOGGER from "../config/LOGGER";
import moment from 'moment';
import Encryption from "../utilities/Encryption";

const admin_login = async ( data : any ) => {
    try{
        let admin = await new AdminModel().getAdmin( data );
        if ( admin.length === 0 ) throw new Error( "Invalid email or password" )
        if (admin[0].status !== 1 ) throw new Error( "Your account is not active" );
        if(admin[0].user_role_id == 1){
            admin[0].role = "admin"
        }
        delete admin[0].user_role_id
        // admin.avatar="/img/avatars/thumb-1.jpg";
        // admin.authority = ["admin", "user"];
        return {
            token : await Encryption.generateJwtToken( { id : admin[0].id }),
            user : admin
        };
    }
    catch(error){
        return error
    }
}
export default {
    admin_login
}