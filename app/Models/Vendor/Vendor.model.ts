import BaseModel from "../BaseModel";

export class VendorModel extends BaseModel {
    constructor() {
        super();
    }

    async create(userData: any) {
        let  Result = await this._executeQuery("insert into vendor set ?", [userData]);
        return Result;
    }
    async updateVendor(Data: any, id:number) {
        let  Result = await this._executeQuery("update vendor set ? where id = ?", [Data, id]);
        return Result;
    }
    async getVendorList() {
        let  Result = await this._executeQuery("select * from vendor", []);
        return Result;
    }
    async getVendorById(id:number) {
        let  Result = await this._executeQuery("select * from vendor where id = ?", [id]);
        return Result;
    }
}
