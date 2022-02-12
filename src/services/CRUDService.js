import bcrypt from "bcryptjs";
import db from "../models/index.js";
const { Op } = require("sequelize");
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("Thành công");
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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {         
    try {
      let user = await db.User.findAll({}); 
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let getUseInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
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
      resolve(user);
    } catch (e) {
      console.log(e);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let oneUser = await db.User.findOne({ where: { id: userId } });
      await oneUser.destroy();
      let user = await db.User.findAll({ raw: true });

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export {
  createNewUser,
  getAllUser,
  getUseInfoById,
  updateUserData,
  deleteUserById,
};
