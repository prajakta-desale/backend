import Encryption from "../utilities/Encryption";
import {DriverModel} from "../Models/Driver/Driver.model";
import {VendorModel} from "../Models/Vendor/Vendor.model";


const addDriver = async (req : any) => {
    let driver,data: any = {}
    try {
        if (req.name == undefined || req.name == null || req.name == "") throw new Error("name is required");
        data.name = req.name;
        if (req.email == undefined || req.email == null || req.email == "") throw new Error(" email is required");
        data.email = req.email;
        if (req.password == undefined || req.password == null || req.password == "") throw new Error(" password is required");
        if (req.confirm_password == undefined || req.confirm_password == null || req.confirm_password == "") throw new Error(" confirm password");
        if (data.password !== data.confirm_password) throw new Error("password did not match");
        let hash = await new Encryption().generateHash(req.password, 10);
        data.password = hash;
        delete req.confirm_password;
        // data.password = req.password;
        if (req.location == undefined || req.location == null || req.location == "") throw new Error(" city is required");
        data.location = req.location;
        if (req.phone_no == undefined || req.phone_no == null || req.phone_no == "") throw new Error(" mobile no  is required");
        data.phone_no = req.phone_no;
        if (req.total_trips == undefined || req.total_trips == null || req.total_trips == "") throw new Error("name is required");
        data.total_trips = req.total_trips;
        if (req.last_trip == undefined || req.last_trip == null || req.last_trip == "") throw new Error(" date is required");
        data.last_trip = req.last_trip;
        if (req.licence_no == undefined || req.licence_no == null || req.licence_no == "") throw new Error("licence no is required");
        data.licence_no = req.licence_no;
        if (req.licence_url == undefined || req.licence_url == null || req.licence_url == "") throw new Error("licence image is required");
        data.licence_url = req.licence_url;
        if (req.vendor_id == undefined || req.vendor_id == null || req.vendor_id == "") throw new Error("vendor_id is required");
        data.vendor_id = req.vendor_id;
        data.role_id = 3;
        driver = await new DriverModel().AddDriver(data)
        return driver
    }
    catch (e:any) {
        throw e
    }
}
const updateDriverDetails = async (req : any, id:any) => {
    let driver,data: any = {}
    try {
        if (req.name == undefined || req.name == null || req.name == "") throw new Error("name is required");
        data.name = req.name;
        if (req.email == undefined || req.email == null || req.email == "") throw new Error(" email is required");
        data.email = req.email;
        // data.password = req.password;
        if (req.location == undefined || req.location == null || req.location == "") throw new Error(" city is required");
        data.location = req.location;
        if (req.phone_no == undefined || req.phone_no == null || req.phone_no == "") throw new Error(" mobile no  is required");
        data.phone_no = req.phone_no;
        if (req.total_trips == undefined || req.total_trips == null || req.total_trips == "") throw new Error("name is required");
        data.total_trips = req.total_trips;
        if (req.last_trip == undefined || req.last_trip == null || req.last_trip == "") throw new Error(" date is required");
        data.last_trip = req.last_trip;
        if (req.licence_no == undefined || req.licence_no == null || req.licence_no == "") throw new Error("licence no is required");
        data.licence_no = req.licence_no;
        if (req.licence_url == undefined || req.licence_url == null || req.licence_url == "") throw new Error("licence image is required");
        data.licence_url = req.licence_url;
        if (req.vendor_id == undefined || req.vendor_id == null || req.vendor_id == "") throw new Error("vendor_id is required");
        data.vendor_id = req.vendor_id;
        data.role_id = 3;
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
                getDriverByID
}