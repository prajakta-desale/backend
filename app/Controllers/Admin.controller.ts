import ApiResponse from "../utilities/ApiResponse";
import httpStatusCodes  from 'http-status-codes';
import IController from "../Types/IController";
import adminService from "../Services/Admin.service";
import constants from "../Constants";

const login : IController = async (req : any, res : any) => {
    try{
        console.log( "Admin login data : ", req.body )
        let admin : any = await adminService.userLogin( req.body );
        console.log( "Admin login data : ", admin )
        if ( admin instanceof Error ){
            console.log( "Controller Error : ", admin.message )
            ApiResponse.error( res,
                httpStatusCodes.BAD_REQUEST,
                admin.message );
        }
        else{
            ApiResponse.result( res,
                admin,
                httpStatusCodes.CREATED )
        }
    }
    catch( error ){
        console.log( "Controller Error : ", error )
        ApiResponse.error( res,
            httpStatusCodes.BAD_REQUEST )
    }
}

const register: IController = async (req, res) => {
    let user;
    try {
        user = await adminService.createUser(req.body);
    } catch (e:any) {
        console.log(e.message);
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            ApiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                'MOBILE_AND_EMAIL_ALREADY_EXISTS',
            );
        } else {
            ApiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                e.message
            );
        }
        return;
    }
    if (user) {
        ApiResponse.result(res, user, httpStatusCodes.CREATED);
    } else {
        ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};
export default {
    login,
    register
}