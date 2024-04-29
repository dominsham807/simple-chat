import bcrypt from "bcryptjs"
import User from "../models/User.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req, res) => {
    try{
        const { fullName, username, email, password, confirmPassword, gender } = req.body 
        
        if(password !== confirmPassword){
            return res.status(400).json({ message: "Passwords not matched" })
        }

        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ message: "User already exists" })
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email, 
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else{

        }
    } catch(error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async(req, res) => {
    try{
        const { username, password } = req.body

        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({ message: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch(error){
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out success" })
    } catch(error){
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}