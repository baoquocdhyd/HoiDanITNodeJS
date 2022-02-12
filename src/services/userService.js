import db from "../models/index.js";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.User.findOne({ 
        where: { email: email } ,
        attributes: ['email', 'roleId', 'password'],
        raw : true,
      });
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.errCode = 0;
          userData.errMessage = "Đúng Password";
          delete user.password;
          userData.user = user;
        } else {
          userData.errCode = 3;
          userData.errMessage = "Sai Password";
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = "không tồn tại email";
      }
      resolve(userData);
    } catch (e) { reject(e) }
  });
};
export { handleUserLogin };
