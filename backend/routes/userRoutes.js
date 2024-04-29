import express from "express" 
import protectedRoute from "../middlewares/protectedRoute.js" 
import { getUsersForSidebar } from "../controllers/userController.js"

const router = express.Router()

router.get("/", protectedRoute, getUsersForSidebar) 

export default router