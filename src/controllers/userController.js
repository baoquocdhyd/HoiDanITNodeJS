import db from "../models/index.js";
import {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
} from "../services/userService.js";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    userData,
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không có Id",
      users: [],
    });
  }
  let users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body
  let message = await updateUserData(data);
  return res.status(200).json(message)
  
}


let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {return res.status(200).json({
    errCode: 1,
    errMessage: "Không có Id",
  }) } 
  let message = await deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message)
}
export { handleLogin, handleGetAllUsers, handleCreateNewUser, handleEditUser, handleDeleteUser};
