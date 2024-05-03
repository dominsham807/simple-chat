import React from 'react'
import useConversation from '../zustand/useConversation.js'
import { useSocketContext } from '../context/socketContext'

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    const isSelected = selectedConversation?._id === conversation._id 
    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    console.log(onlineUsers)
    console.log(isOnline)

    return (
        <>
        <div className={`flex gap-2 items-center text-gray-200 ${isSelected ? "hover:bg-sky-500" : "hover:bg-slate-50 hover:text-black"} rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""} transition duration-300`} onClick={() => !isSelected ? setSelectedConversation(conversation) : setSelectedConversation(null)}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} alt='User Profile' />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold">{conversation.fullName}</p>
                    <span className="text-xl">{emoji}</span>
                </div>
            </div>
        </div>
        {!lastIdx && <div className='divider divider-neutral' />}
        </> 
    )
}

export default Conversation