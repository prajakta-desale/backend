import IController from "../Types/IController";
import apiResponse from "../utilities/ApiResponse";
import httpStatusCodes from "http-status-codes";
import LOGGER from "../config/LOGGER";
import vendorService from "../Services/Vendor.service";

const register: IController = async (req, res) => {
    let vendor;
    try {
        vendor = await vendorService.createVendor(req.body);
    } catch (e) {
        console.log(e)
        // @ts-ignore
        // if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
        //     apiResponse.error(
        //         res,
        //         httpStatusCodes.BAD_REQUEST,
        //         'EMAIL_ALREADY_EXISTS',
        //     );
            return;
        // }
    }
    if (vendor) {
        apiResponse.result(res, vendor, httpStatusCodes.CREATED);
    } else {
        // LOGGER.info("error" , vendor)
        console.log('controller------->error', vendor)
        apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};

export default {
    register
};
