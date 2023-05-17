import IController from "../Types/IController";
import apiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
import constants from "../Constants";
import LOGGER from "../config/LOGGER";
import vendorService from "../Services/Vendor.service";

const register: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await vendorService.createVendor(req.body);
        if (vendor instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, vendor
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
const updateVendorDetails: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await vendorService.updateVendorDetails(req.body);
        if (vendor instanceof Error) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
        } else {
            apiResponse.result(res, vendor
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
const getVendorList: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await vendorService.getVendorList();
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
const getSingleVendor: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await vendorService.getSingleVendor(req);
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
    updateVendorDetails,
    getVendorList,
    getSingleVendor
};
