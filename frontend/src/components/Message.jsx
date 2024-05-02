import React from 'react'
import { useAuthContext } from '../context/authContext'
import useConversation from '../zustand/useConversation.js'
import { extractTime } from '../utils/extractTime.js'

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const { selectedConversation } = useConversation()
    const fromMe = message.senderId === authUser._id 
    const formattedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? "chat-end" : "chat-start" 
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic 
    const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-600"

    // const shakeClass = message.shouldShake ? "shake" : ""

    return (
        <div className={`chat ${chatClassName} text-white`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="Profile" />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleBgColor}`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs pt-1 flex gap-1 items-center">{formattedTime}</div>
        </div>
    )
}

export default Message