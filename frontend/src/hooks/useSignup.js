import { useState } from "react"
import toast from "react-hot-toast" 
import { useNavigate } from "react-router-dom"

const useSignup = () => {
    const [loading, setLoading] = useState(false) 

    const signup = async({ fullName, username, email, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, email, password, confirmPassword, gender }) 
        if(!success) return 
        
        const navigate = useNavigate()

        setLoading(true) 

        try{ 
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender })
            })

            const data = await res.json()
            console.log(data)

            if(data.error){
                throw new Error(data.error)
            }

            toast.success("Sign up success! Please login!")
            navigate("/login")
        } catch(error){
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup

function handleInputErrors({ fullName, username, email, password, confirmPassword, gender }){
    if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields")
        return false 
    }

    if (password !== confirmPassword) {
        toast.error("Passwords not matched")
        return false 
    }

    if (password.length < 8) {
        toast.error("Passwords must be at least 8 characters")
        return false 
    }

    return true
}