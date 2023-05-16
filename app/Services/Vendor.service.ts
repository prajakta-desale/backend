import {VendorModel} from "../Models/Vendor/Vendor.model";


const createVendor = async (data : any) => {
    console.log('---------->service ', data)
    let vendor = await new VendorModel().create(data)
    return vendor
}
export default {createVendor}