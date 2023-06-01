const jwt = require('jsonwebtoken');
import {UserModel} from "../Models/User/User.model";
import Encryption from "../utilities/Encryption";
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'desaleprajakta1@gmail.com',
      pass: 'P_R!yu@03',
    },
  });
const createUser = async (data : any) => {
    try{
    let roleName = await new UserModel().getRole(data.role)
    if(roleName.length == 0) throw new Error("Role not found")
    data.role_id = roleName[0].id
    delete data.role;
    if(data.password!==data.confirm_password) throw new Error("password did not match");
    let hash = await new Encryption().generateHash(data.password, 10);
    data.password = hash;
    delete data.confirm_password;
    // console.log(data)
    let user = await new UserModel().createUser(data);
    return user;
    }
    catch(error:any){
        throw error;

    }
};

async function loginUser(data:any) {
    try{
        let user = await new UserModel().getUser(data);
        if(user.length == 0) throw new Error("No Such User Exists");
        //password bcrypt
        const match =await new Encryption().verifypassword(data.password, user[0].password);
        if(!match) throw new Error("Invalid password");
        const token = await Encryption.generateJwtToken({id : user.id});
        user[0].token = token;
         delete user[0].password
        return user;
    }catch(e:any){
        return e;
        console.log(e.message);
    }
}
const resetPasswordLink = async (req:any) =>{
    let user, data:any = {}
    try{
        const resetToken = uuidv4();
        // Set the expiration time for the reset token (e.g., 1 hour)
        const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now
        data.email = req.email
        data.reset_token = resetToken
        data.token_expire = resetTokenExpiration
        user = await new UserModel().setResetToken(data)
        const mailOptions = {
            from: 'desaleprajakta1@gmail.com',
            to: 'prajudesale777@gmail.com',
            subject: 'Password Reset',
            text: `Click on the following link to reset your password:  http://localhost:3000/user/reset-pass/${resetToken}`,
          };
      
          let result = await transporter.sendMail(mailOptions);
          return  result
      
        //   return res.status(200).json({ message: 'Password reset link sent successfully' });
        // } catch (error) {
        //   console.error('Error sending password reset link:', error);
        //   return res.status(500).json({ error: 'An error occurred while sending the password reset link' });
        // }
    }catch(error:any)
    {
        console.log("error----------->", error.message);
         throw error
    }
}
export default {
    createUser,
    loginUser,
    resetPasswordLink
};
