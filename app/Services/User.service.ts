import { UserModel } from "../Models/User/User.model";
import Encryption from "../utilities/Encryption";

const userLogin = async (data: any) => {
  try {
    let result = await new UserModel().getUser(data);
    if (result.length === 0) throw new Error("Invalid email or password");
    const match = await new Encryption().verifypassword(
      data.password,
      result[0].password
    );
    if (!match) throw new Error("Invalid password");
    delete result[0].password;
    if (result[0].status !== 1) throw new Error("Your account is not active");
    let role;
    switch (result[0].role_id) {
      case 1:
        result[0].role = "admin";
        break;
      case 2:
        result[0].role = "JobProvider";
        break;
      case 3:
        result[0].role = "JobSeeker";
        break;
    }
    delete result[0].role_id;
    return {
      token: await Encryption.generateJwtToken({ id: result[0].id }),
      user: result,
    };
  } catch (error: any) {
    console.log("error:", error.message);
    return error;
  }
};
const createUser = async (data: any) => {
  try {
    let tableName;
    switch (data.role) {
      case "jobProvider":
        tableName = "user";
        break;
      case "admin":
        tableName = "user";
        break;
      case "jobSeeker":
        tableName = "user";
        break;
      default:
        return { error: "Invalid role" };
    }
    // console.log("in service-------------->", data.role);
    const role_id = await new UserModel().getUserRole(data.role);
    // console.log("in service-------------->", role_id);
    if (data.password !== data.confirm_password)
      throw new Error("password did not match");
    let hash = await new Encryption().generateHash(data.password, 10);
    data.password = hash;
    delete data.confirm_password;
    delete data.role;
    data.role_id = role_id[0].id;
    // console.log("in service------------->", data);
    let user = await new UserModel().createUser(data, tableName);
    return user;
  } catch (error: any) {
    throw error;
  }
};
export default {
  userLogin,
  createUser,
};
