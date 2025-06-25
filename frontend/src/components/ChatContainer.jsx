import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './Skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

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
                {messages.map((msg) => (
                    <div key={msg._id}
                        className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={msg.senderId === authUser._id ? authUser.profPic : selectedUser.profPic} alt="profile" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <div className="text-xs opacity-50 ml-1">{msg.createdAt}</div>
                        </div>
                        <div className="chat-bubble flex flex-col">{msg.image && (
                            <img src={msg.image} alt='Attachment' className='sm:max-w-[200px] rounded-md mb-2' />
                        )}
                            {msg.text && <p>{msg.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer
