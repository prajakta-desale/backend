import Encryption from "../utilities/Encryption";
import {DriverModel} from "../Models/Driver/Driver.model";
import formidable from "formidable";
import fs from "fs"
import path from "path"

const addDriver = async (req : any, res:any) => {
    let driver,fields,files ;
        let data: any = {}
    try {
        // @ts-ignore
        ({fields, files} = await new Promise((resolve) => {
            new formidable.IncomingForm().parse(req, async (err: any, fields: any, files: any) => {
                resolve({fields: fields, files: files});
            })
        }));
        if (!fields?.name) throw new Error('name is required');
        data.name = fields.name;
         if (!fields.email) throw new Error(" email is required");
        data.email = fields.email;
        if (!fields.password) throw new Error(" password is required");
        if (!fields.confirm_password) throw new Error(" confirm password");
        if (fields.password !== fields.confirm_password) throw new Error("password did not match");
        // hashing password
        let hash = await new Encryption().generateHash(fields?.password, 10);
        data.password = hash;
        delete fields.confirm_password;
        // data.password = req.password;
        if (!fields.location) throw new Error(" city is required");
        data.location = fields.location;
        if (!fields.phone_no) throw new Error(" mobile no  is required");
        data.phone_no = fields.phone_no;
        if (!fields.total_trips) throw new Error("name is required");
        data.total_trips = fields.total_trips;
        if (!fields.last_trip) throw new Error(" date is required");
        data.last_trip = fields.last_trip;
        if (!fields.licence_no) throw new Error("licence no is required");
        data.licence_no = fields.licence_no;
        if (!fields.vendor_id) throw new Error("licence no is required");        
        data.vendor_id = fields.vendor_id;
        data.role_id = 3;
        // file uploading
        if(!files?.licence) throw new Error("licence image is required");else{
            if (fileNotValid(files.licence.mimetype)) throw new Error("Only .png, .jpg , .jpeg and .pdf format allowed! for image");
            var file = files.licence;
        }
        const oldPath = file.filepath;
        const uniqueFileName = `public/${file.originalFilename}-${Date.now()}`;
        const newPath = path.join(uniqueFileName);
        data.licence_url = newPath
        //@ts-ignore
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
              // Handle the error
              console.log("error while uploading file")
              return;
            }
            console.log("file uploaded successfully")
             
          });
        driver = await new DriverModel().AddDriver(data)
        return driver
    }
    catch (e:any) {
            console.log("error",e)
            throw e
    }
}

const fileNotValid = (type: any) => {
    if (type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png'|| type == 'image/pdf') {
        return false;
    }
    return true;
};
const updateDriverDetails = async (req : any) => {
    let driver,fields,files ;
        let data: any = {}
        let id = req.query.id
    try {
        // @ts-ignore
        ({fields, files} = await new Promise((resolve) => {
            new formidable.IncomingForm().parse(req, async (err: any, fields: any, files: any) => {
                resolve({fields: fields, files: files});
            })
        }));
        if (!fields?.name) throw new Error('name is required');
        data.name = fields.name;
         if (!fields.email) throw new Error(" email is required");
        data.email = fields.email;
        if (!fields.location) throw new Error(" city is required");
        data.location = fields.location;
        if (!fields.phone_no) throw new Error(" mobile no  is required");
        data.phone_no = fields.phone_no;
        if (!fields.total_trips) throw new Error("name is required");
        data.total_trips = fields.total_trips;
        if (!fields.last_trip) throw new Error(" date is required");
        data.last_trip = fields.last_trip;
        if (!fields.licence_no) throw new Error("licence no is required");
        data.licence_no = fields.licence_no;
        if (fields.vendor_id == undefined || fields.vendor_id == null || fields.vendor_id == "") throw new Error("vendor_id is required");
        data.vendor_id = fields.vendor_id;
        data.role_id = 3;
        // file uploading
        if(!files?.licence) throw new Error("licence image is required");else{
            if (fileNotValid(files.licence.mimetype)) throw new Error("Only .png, .jpg , .jpeg and .pdf format allowed! for image");
            var file = files.licence;
        }
        const oldPath = file.filepath;
        const uniqueFileName = `public/${file.originalFilename}-${Date.now()}`;
        const newPath = path.join(uniqueFileName);
        data.licence_url = newPath
        //@ts-ignore
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
              // Handle the error
              console.log("error while uploading file")
              return;
            }
            console.log("file uploaded successfully")
             
          });
        driver = await new DriverModel().UpdateDriverDetails(data,id)
        return driver
    }
    catch (e:any) {
        throw e
    }
}
const getDriverList = async ()=>{
    let driver :any;
    try {
        driver = await new DriverModel().getDriverList()
        if (driver.length == 0) throw new Error(" vendor not found!");
        for(let i = 0 ; i < driver.length ; i++) {
            if (driver[i].status == 1) {
                driver[i].status = {value: 1, label: "Active"};
            } else {
                driver[i].status = {value: 0, label: "Inactive"};
            }
            delete driver[i].password
        }
        return driver
    }catch (e:any) {
        console.log('error',e.message)
        throw e
    }
}
const  getDriverByID = async (req:any)=>{
    let driver , id :any;
    id = req.query.id
    try {
        driver = await new DriverModel().getDriverDetailsById(id)
        if (driver.length == 0) throw new Error("  drivers for this id is not found!");
        for(let i = 0 ; i < driver.length ; i++) {
            if (driver[i].status == 1) {
                driver[i].status = {value: 1, label: "Active"};
            } else {
                driver[i].status = {value: 0, label: "Inactive"};
            }
            delete driver[i].password
        }
        return driver
    }catch (e:any) {
        console.log('error',e)
        throw e
    }
}

export default {
                addDriver,
                updateDriverDetails,
                getDriverList,
                getDriverByID,
                
}