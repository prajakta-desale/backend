import express from 'express';
import vendorController from '../../Controllers/Vendor.controller'


const router = express.Router();
router.post(
    '',
    vendorController.register
);
router.put(
    '',
    vendorController.updateVendorDetails
);
router.get(
    '',
    vendorController.getVendorList
);
router.get(
    '/id',
    vendorController.getSingleVendor
);
export default router