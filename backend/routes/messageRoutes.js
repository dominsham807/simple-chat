import express from "express" 
import protectedRoute from "../middlewares/protectedRoute.js"
import { sendMessage, getMessages } from "../controllers/messageController.js"

const router = express.Router()

router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, sendMessage)

export default router