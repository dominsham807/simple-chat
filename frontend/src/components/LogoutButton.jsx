import React from 'react'
import useLogout from '../hooks/useLogout.js'
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
    const { loading, logout } = useLogout()

    return (
        <div className='mt-auto'>
            {!loading ? (
                <div className="flex gap-3 text-white text-xl items-center cursor-pointer" onClick={logout}> 
                    <BiLogOut className='w-6 h-6  cursor-pointer' />
                    Logout 
                </div> 
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    )
}

export default LogoutButton