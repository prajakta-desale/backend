import express from 'express';
import driverController from "../../Controllers/Driver.controller";
import multer from "multer"

// const multerStorage = multer.diskStorage({

//     destination:(req,file,cb)=>{
//             console.log('file',req)
//         cb(null,'public/img')

//     },

//     filename:(req,file,cb)=>{

//         const ext = file.mimetype.split('/')[1]
//         cb(null,`${file.fieldname}--${Date.now()}.${ext}`)

//     }

// })
// const upload = multer({
        
//     storage:multerStorage
// })
const router = express.Router();


// router.post(
//     //@ts-ignore
//     '', upload.single('myFile'),
//    driverController.register

// );
router.post('', driverController.register)

router.put('', driverController.updateDriverDetails);
router.get('',driverController.getDriverList);
router.get('/id',driverController.getDriverByID);
export default router