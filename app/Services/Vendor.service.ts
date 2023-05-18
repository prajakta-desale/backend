import {VendorModel} from "../Models/Vendor/Vendor.model";
import Encryption from "../utilities/Encryption";

const createVendor = async (req : any) => {
    let vendor,data: any = {}
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
        data.role_id = 2;
        vendor = await new VendorModel().create(data)
        return vendor
    }
    catch (e:any) {
        throw e
    }
}
const updateVendorDetails = async (req : any, id:any) => {

    let vendor, data: any = {}
    try {
        if (req.name == undefined || req.name == null || req.name == "") throw new Error("name is required");
        data.name = req.name;
        if (req.email == undefined || req.email == null || req.email == "") throw new Error(" email is required");
        data.email = req.email;
        // if (req.password == undefined || req.password == null || req.password == "") throw new Error(" password is required");
        // data.password = req.password;
        if (req.location == undefined || req.location == null || req.location == "") throw new Error(" city is required");
        data.location = req.location;
        if (req.phone_no == undefined || req.phone_no == null || req.phone_no == "") throw new Error(" mobile no  is required");
        data.phone_no = req.phone_no;
        if (req.total_trips == undefined || req.total_trips == null || req.total_trips == "") throw new Error("name is required");
        data.total_trips = req.total_trips;
        vendor = await new VendorModel().updateVendor(data, id)
        return vendor
    }catch (e:any) {
        console.log('error',e.message)
        throw e
    }
}
const getVendorList = async ()=>{
    let vendors :any;
    try {
        vendors = await new VendorModel().getVendorList()
        if (vendors.length == 0) throw new Error(" vendor not found!");
        for(let i = 0 ; i < vendors.length ; i++) {
            if (vendors[i].status == 1) {
                vendors[i].status = {value: 1, label: "Active"};
            } else {
                vendors[i].status = {value: 0, label: "Inactive"};
            }
            delete vendors[i].password
        }
        return vendors
    }catch (e:any) {
        console.log('error',e.message)
        throw e
    }
}
const  getSingleVendor = async (req:any)=>{
    let vendor , id :any;
    id = req.query.id
    try {
        vendor = await new VendorModel().getVendorById(id)
        if (vendor.length == 0) throw new Error(" vendor for this id is not found!");
        if (vendor[0].status == 1) {
            vendor[0].status = {value: 1, label: "Active"};
        } else {
            vendor[0].status = {value: 0, label: "Inactive"};
        }
        delete vendor[0].password
        return vendor
    }catch (e:any) {
        console.log('error',e)
         throw e
    }
}
export default {createVendor,
                updateVendorDetails,
                getVendorList,
                getSingleVendor
}