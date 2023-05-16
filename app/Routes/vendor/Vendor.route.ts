import express from 'express';
import vendorController from '../../Controllers/Vendor.controller'


const router = express.Router();
router.post(
    '/register',
    vendorController.register
);
export default router