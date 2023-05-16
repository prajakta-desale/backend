import  {Router} from 'express';
import userRoute from './user/User.route';
import vendorRoute from './vendor/Vendor.route';
import adminRoute from "./admin/Admin.route";
const router = Router();

router.use('/user', userRoute);
// @ts-ignore
router.use('/vendor',vendorRoute);
router.use('/admin', adminRoute);
export default router;
