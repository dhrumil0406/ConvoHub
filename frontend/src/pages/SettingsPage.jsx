import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { Moon, Send, Sun } from 'lucide-react'

const PREVIEW_MESSAGES = [
    {
        id: 1,
        content: "Hello! How can I help you today?",
        isSent: true,
        timestamp: new Date().toLocaleTimeString(),
    },
    {
        id: 2,
        content: "Hi! I have a question about your services.",
        isSent: true,
        timestamp: new Date().toLocaleTimeString(),
    },
];

const SettingsPage = () => {

    const { theme, toggleTheme } = useThemeStore();
    return (
        <div className='min-h-screen container mx-auto px-4 pt-12 max-w-5xl'>
            <div className='space-y-6'>
                <div className='flex justify-between border border-base-300 shadow-lg bg-base-200 px-8 py-6 rounded-lg'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-3xl font-semibold'>Theme</h1>
                        <p className='text-sm text-base-content/70'>Customize your experience</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='text-sm text-base-content/70'>Light</span>
                        <label className='swap swap-rotate'>
                            <input
                                type='checkbox'
                                checked={theme == 'dark'}
                                onChange={toggleTheme}
                            />
                            <Sun className='swap-off w-6 h-6'/>
                            <Moon className='swap-on w-6 h-6'/>
                        </label>
                        <span className='text-sm text-base-content/70'>Dark</span>
                    </div>
                </div>

                {/* preview section */}
                <h1 className='text-2xl font-semibold mb-3'>Preview</h1>
                <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg'>
                    <div className='p-4 bg-base-200'>
                        <div className='max-w-lg mx-auto'>
                            <div className='bg-base-100 rounded-xl shadow-sm overflow-hidden'>
                                <div className='px-4 py-3 border-b border-base-300 bg-base-100'>
                                    <div className='flex items-center gap-3'>
                                        D
                                    </div>
                                    <div>
                                        <h3 className='font-medium text-sm'>Dhrumil Mandaviya</h3>
                                        <p className='text-xs text-base-content/70'>Online</p>
                                    </div>
                                </div>
                            </div>

                            <div className='p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-hidden bg-base-100'>
                                {PREVIEW_MESSAGES.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[80%] rounded-xl p-3 shadow-lg
                                            ${msg.isSent} ? "bg-primary text-primary-content" : "bg-base-200"`
                                        }>
                                            <p className='text-sm'>{msg.content}</p>
                                            <p className={`text-[10px] mt-1.5 ${msg.isSent} ? "text-primary-content/70" : "text-base-content/70"`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='p-4 border-t border-base-300 bg-base-100'>
                                <div className='flex gap-2'>
                                    <input type="text"
                                        className='input input-bordered flex flex-1 text-sm h-10'
                                        placeholder='Type a message...'
                                        value='this is a preview'
                                        readOnly
                                    />
                                    <button className='btn btn-primary h-10 min-h-0'>
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
