import BaseModel from "../BaseModel";

export class DriverModel extends BaseModel {
    constructor() {
        super();
    }

    async AddDriver(userData: any) {
        let Result = await this._executeQuery("insert into Drivers set ?", [userData]);
        return Result;
    }

    async UpdateDriverDetails(Data: any, id: number) {
        let Result = await this._executeQuery("update Drivers set ? where id = ?", [Data, id]);
        return Result;
    }

    async getDriverList() {
        let Result = await this._executeQuery("select * from Drivers", []);
        return Result;
    }

    async getDriverDetailsById(id: number) {
        let Result = await this._executeQuery("select * from Drivers where vendor_id = ?", [id]);
        return Result;
    }
}
