import  {Router} from 'express';
import userRoute from './user/User.route';
import vendorRoute from './vendor/Vendor.route';
import adminRoute from "./admin/Admin.route";
import driverRoute from "./driver/Driver.route"


const router = Router();

router.use('/user', userRoute);
// @ts-ignore
router.use('/vendor',vendorRoute);
router.use('/admin', adminRoute);
router.use('/driver', driverRoute);

export default router;
