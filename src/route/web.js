import express from 'express' ;
import {getHomePage, getHomePage2} from '../controllers/homeController.js'
let router = express.Router() 
let initWebRoutes = (app) => {
	router.get('/',getHomePage);
	router.get('/A', getHomePage2);	
  return app.use("/",router);
} 

export default initWebRoutes;
