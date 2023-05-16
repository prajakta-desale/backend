import BaseModel from "../BaseModel";

export class VendorModel extends BaseModel {
    constructor() {
        super();
    }

    async create(userData: any) {
        let  Result = await this._executeQuery("insert into vendor set ?", [userData]);
        return Result;
    }
}
