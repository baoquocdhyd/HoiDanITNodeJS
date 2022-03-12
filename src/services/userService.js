import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { Op } from "sequelize";
// const { Op } = require('sequelize');

let checkUserEmail = (a) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: a },
        raw: true,
      });
      resolve(user ? true : false);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.User.findOne({
        where: { email: email },
        attributes: ["email", "roleId", "password"],
        raw: true,
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
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (a) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (a === "ALL") {
        user = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      } else if (a) {
        user = await db.User.findOne({
          where: { id: a },
          attributes: { exclude: ["password"] },
          raw: true,
        });
        console.log(user);
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let a = await checkUserEmail(data.email);
      if (a) {
        resolve({ errCode: 1, message: "Đã tồn tại email" });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          firstName: data.firstname,
          lastName: data.lastname,
          password: hashPasswordFromBcrypt,
          email: data.email,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({ errCode: 0, message: "OK" });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (a) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: a } });
      if (!user) {
        resolve({ errCode: 2, message: "không có Id" });
      }
      await db.User.destroy({ where: { id: a } });
      resolve({ errCode: 0, message: "Đã xóa thành công" });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errCode: 1, message: "Không có Id" });
      }
      await db.User.update(
        {
          firstName: data.firstname,
          lastName: data.lastname,
          password: await bcrypt.hashSync(data.password, salt),
          email: data.email,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
        },
        { where: { id: data.id } }
      );
      let user = await db.User.findAll({ raw: true });
      resolve({ errCode: 0, message: "Cập nhật thành công", user });
    } catch (e) {
      reject(e);
    }
  });
};

export {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
