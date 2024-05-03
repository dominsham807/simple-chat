import express from "express"
import dotenv from "dotenv" 
import cookieParser from "cookie-parser"
import path from "path"
import connect from "./db/connect.js"
import authRoutes from "./routes/authRoutes.js"
import messagesRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { app, server } from "./socket/socket.js"

const PORT = process.env.PORT || 5000 

const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(5000, () => {
    connect()
    console.log(`Server running on PORT ${PORT}`)
})