import express from 'express';
import vendorController from '../../Controllers/Vendor.controller'


const router = express.Router();
router.post(
    '/register',
    vendorController.register
);
router.put(
    '/update',
    vendorController.updateVendorDetails
);
router.get(
    '/list',
    vendorController.getVendorList
);
router.get(
    '/get',
    vendorController.getSingleVendor
);
export default router