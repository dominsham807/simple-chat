import React, { useEffect, useRef } from 'react'
import useGetMessages from '../hooks/useGetMessages.js'
import Message from './Message'
import MessageSkeleton from './MessageSkeleton'

const Messages = () => {
    const { messages, loading } = useGetMessages()

    const lastMessageRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id}>
                    <Message message={message} />
                </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <p className="text-center text-white">Send a message to start conversation</p>
                </div> 
            )}
        </div>
    )
}

export default Messages