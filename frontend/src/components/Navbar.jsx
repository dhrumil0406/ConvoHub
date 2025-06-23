import React from 'react'
import { useAuthStore } from '../store/userAuthStore';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Settings, User } from 'lucide-react';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (
        <nav className="bg-base-300 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                {/* Left side: Logo */}
                <Link to="/" className="text-xl font-bold text-primary">
                    <div className='flex items-center gap-2'>
                        <img src="/convoHubLogo.png" alt="Logo" className="h-8 w-10" />
                        <span className="hidden sm:inline text-xl text-white" style={{ fontFamily: "amerika" }}>ConvoHub</span>
                    </div>
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Right side: Setting icon if not logged in */}
                    <Link to="/settings" className="btn btn-sm gap-2 transition-colors text-base-content">
                        <Settings className="size-5" />
                        <span className='hidden sm:inline'>Settings</span>
                    </Link>

                    {/* Right side: User profile and logout */}
                    <div className="flex items-center gap-4">
                        {authUser && (
                            <>
                                <Link to="/profile" className="btn btn-sm gap-2 transition-colors text-base-content">
                                    <User className="size-5" />
                                    {/* <img src={authUser.profilePicture || "/defaultProfile.png"} alt="Profile" className="w-8 h-8 rounded-full" /> */}
                                    <span className='hidden sm:inline'>{authUser.fullName}</span>
                                </Link>

                                <button onClick={logout} className="flex gap-2 items-center btn btn-sm text-base-content transition-colors">
                                    <LogOut className="size-5" />
                                    <span className='hidden sm:inline'>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
