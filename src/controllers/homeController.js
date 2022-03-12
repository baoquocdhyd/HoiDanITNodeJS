import db from "../models/index.js";
import {
  createNewUser,
  getAllUser,
  getUseInfoById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getHomePage2 = (req, res) => {
  return res.render("homepage.ejs");
};
let getCrud = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  await createNewUser(req.body);
  return res.render("post-crud.ejs");
};
let displayGetCRUD = async (req, res) => {
  let data = await getAllUser();
  return res.render("displayCRUD.ejs", { dataTable: data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  let userData = await getUseInfoById(userId);
  return res.render("editCRUD.ejs", { user: userData });
};

let putCRUD = async (req, res) => {
  let newdata = await updateUserData(req.body);
  return res.render("displayCRUD.ejs", { dataTable: newdata });
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  let newdata = await deleteUserById(userId);
  return res.render("displayCRUD.ejs", { dataTable: newdata });
};



export {
  getHomePage,
  getHomePage2,
  getCrud,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
  
};
