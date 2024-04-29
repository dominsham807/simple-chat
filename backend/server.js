import express from "express"
import dotenv from "dotenv" 
import cookieParser from "cookie-parser"
import connect from "./db/connect.js"
import authRoutes from "./routes/authRoutes.js"
import messagesRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000 

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/users", userRoutes)

app.listen(5000, () => {
    connect()
    console.log(`Server running on PORT ${PORT}`)
})