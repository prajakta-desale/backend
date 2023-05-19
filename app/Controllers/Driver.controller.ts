import IController from "../Types/IController";
import driverService from "../Services/Driver.service";
import apiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
import constants from "../Constants";


const register: IController = async (req, res) => {
    let driver;
    try {
         driver = await driverService.addDriver(req.body);
        if (driver instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, driver
                , httpStatusCodes.CREATED);
        }
    } catch (e: any) {
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
};
const updateDriverDetails: IController = async (req, res) => {
    let driver;
    try {
        driver = await driverService.updateDriverDetails(req.body,req.query.id);
        if (driver instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, driver
                , httpStatusCodes.CREATED);
        }
    } catch (e: any) {
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
};
const getDriverList: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await driverService.getDriverList();
        if (vendor instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, vendor
                , httpStatusCodes.CREATED);
        }
    } catch (e: any) {
        // @ts-ignore
        apiResponse.error(
            res,
            httpStatusCodes.BAD_REQUEST,
            e.message
        );
    }
    return;
};
const getDriverByID: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await driverService.getDriverByID(req);
        if (vendor instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, vendor
                , httpStatusCodes.CREATED);
        }
    } catch (e: any) {
        // @ts-ignore
        apiResponse.error(
            res,
            httpStatusCodes.BAD_REQUEST,
            e.message
        );
    }
    return;
};
export default {
                register,
                updateDriverDetails,
                getDriverList,
                getDriverByID
}