import httpStatusCodes from 'http-status-codes';

import IController from '../Types/IController';
import apiResponse from '../utilities/ApiResponse';
import userService from '../Services/User.service';
import constants from "../Constants";
import LOGGER from "../config/LOGGER";

const login: IController = async (req, res) => {
    userService.loginUser(req.body)
        .then( (user) => {
        if(user instanceof Error){
            console.log("user 2", user.message)
            apiResponse.error(
                res,
                // response.send('Incorrect Username and/or Password!');
                httpStatusCodes.BAD_REQUEST,
                user.message
            );
        }else{
            console.log("user 3", user.message)
            // response.redirect('/home');
            apiResponse.result(res, user[0], httpStatusCodes.OK);
        }
    }).catch(err => {
        console.log("Error  ->", err);
        apiResponse.error(
            res,
            httpStatusCodes.BAD_REQUEST,
            //locale.INVALID_CREDENTIALS,
        );
    });
};

const register: IController = async (req, res) => {
    let user;
    try {
        user = await userService.createUser(req.body);
    } catch (e:any) {
        console.log(e.message);
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            apiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                'MOBILE_AND_EMAIL_ALREADY_EXISTS',
            );
        } else {
            apiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                e.message
            );
        }
        return;
    }
    if (user) {
        apiResponse.result(res, user, httpStatusCodes.CREATED);
    } else {
        apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};

const resetPasswordLink: IController = async (req, res) => {
    let user:any;
    try {
        user = await userService.resetPasswordLink(req.body);
    } catch (e:any) {
        console.log(e.message);
        // @ts-ignore
        if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
            apiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                'MOBILE_AND_EMAIL_ALREADY_EXISTS',
            );
        } else {
            apiResponse.error(
                res,
                httpStatusCodes.BAD_REQUEST,
                e.message
            );
        }
        return;
    }
    if (user) {
        apiResponse.result(res, user, httpStatusCodes.CREATED);
    } else {
        apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};

export default {
    login,
    register,
    resetPasswordLink
};
