import {VendorModel} from "../Models/Vendor/Vendor.model";

const createVendor = async (req : any) => {
    let vendor,data: any = {}
    if (req.name == undefined || req.name == null || req.name == "") throw new Error("name is required");
     data.name = req.name;
    if (req.email == undefined || req.email == null || req.email == "") throw new Error(" email is required");
    data.email = req.email;
    if (req.password == undefined || req.password == null || req.password == "") throw new Error(" password is required");
    data.password = req.password;
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
const updateVendorDetails = async (req : any) => {
    let vendor, id, data: any = {}
    if (req.name == undefined || req.name == null || req.name == "") throw new Error("name is required");
    data.name = req.name;
    if (req.email == undefined || req.email == null || req.email == "") throw new Error(" email is required");
    data.email = req.email;
    if (req.password == undefined || req.password == null || req.password == "") throw new Error(" password is required");
    data.password = req.password;
    if (req.location == undefined || req.location == null || req.location == "") throw new Error(" city is required");
    data.location = req.location;
    if (req.phone_no == undefined || req.phone_no == null || req.phone_no == "") throw new Error(" mobile no  is required");
    data.phone_no = req.phone_no;
    if (req.total_trips == undefined || req.total_trips == null || req.total_trips == "") throw new Error("name is required");
    data.total_trips = req.total_trips;
    id = req.vendor_id
    vendor = await new VendorModel().updateVendor(data, id)
    return vendor
}
const getVendorList = async ()=>{
    let vendors :any;
    try {
        vendors = await new VendorModel().getVendorList()
        if (vendors.length == 0) throw new Error(" vendor not found!");
        return vendors
    }catch (e:any) {
        console.log('error',e.message)
        throw e
    }
}
const  getSingleVendor = async (req:any)=>{
    let vendor , id :any;
    id = req.query.id
    // console.log('get vendor service---------->',id )
    try {
        vendor = await new VendorModel().getVendorById(id)
        if (vendor.length == 0) throw new Error(" vendor for this id is not found!");
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