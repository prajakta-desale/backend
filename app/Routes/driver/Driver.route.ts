import express from 'express';
import driverController from "../../Controllers/Driver.controller";


const router = express.Router();
router.post(
    '',
   driverController.register

);
router.put(
    '',
    driverController.updateDriverDetails

);
router.get(
    '',
     driverController.getDriverList
);
router.get(
    '/id',
   driverController.getDriverByID
);
export default router