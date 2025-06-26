import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './Skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore';
import formatMessageTime from '../lib/utils';
import { useRef } from 'react';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messages]);


    if (isMessagesLoading) {
        return (
            <div className=' flex-1 flex flex-col overflow-auto'>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((msg) => {
                    return <div key={msg._id}
                        ref={messageEndRef}
                        className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={msg.senderId === authUser._id ? authUser.profPic : selectedUser.profPic} alt="profile" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <div className="text-xs opacity-50 ml-1">{formatMessageTime(msg.createdAt)}</div>
                        </div>
                        <div className="chat-bubble flex flex-col">{msg.image && (
                            <img src={msg.image} alt='Attachment' className='sm:max-w-[200px] rounded-md mb-2' />
                        )}
                            {msg.text && <p>{msg.text}</p>}
                        </div>
                    </div>
                })}
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer
