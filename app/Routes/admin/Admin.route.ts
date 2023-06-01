import adminController from '../../Controllers/Admin.controller';
// import adminSchema from '../../Constants/Schema/Admin.schema';
import path from 'path';
import express from 'express'
import { celebrate } from 'celebrate';
const router = express.Router();

router.post(
    '/sign-in',
    // celebrate( adminSchema.login ),
    adminController.login
)
router.post(
    '/register',
    // celebrate( adminSchema.login ),
    adminController.register
)

export default router;
