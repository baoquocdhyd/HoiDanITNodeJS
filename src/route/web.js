import express from "express";
import {
  getHomePage,
  getHomePage2,
  getCrud,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,  
} from "../controllers/homeController.js";

import {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
} from "../controllers/userController.js";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/A", getHomePage2);
  router.get("/crud", getCrud);
  router.post("/post-crud", postCRUD); //tạo mới
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.post("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);
  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUsers); // tải về toàn bộ
  router.post("/api/create-new-user", handleCreateNewUser);
  router.put("/api/edit-user", handleEditUser);
  router.delete("/api/delete-user", handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
