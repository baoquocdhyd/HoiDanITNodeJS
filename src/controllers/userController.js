import db from "../models/index.js";
import {handleUserLogin} from "../services/userService.js";
let handleLogin =  async(req, res) => {
  let email =req.body.email;
  let password =req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !"
    });
  } ;
  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    userData
  });
};
export { handleLogin };


