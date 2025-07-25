import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, MessageSquare, Lock, Loader2 } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { login, isLoggingIn } = useAuthStore();

    const validateForm = () => {
        if (!formData.email.trim()) {
            toast.error("Email is required");
            return false;
        }
        if (!formData.password.trim()) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(formData);
        }
    }

    return (
        <div className='min-h-screen bg-base-100 grid lg:grid-cols-2 absolute top-0 left-0 right-0 bottom-0 pt-16'>
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                <div className='w-full max-w-md space-y-8'>
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group:hover bg-primary-content transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
                            <p className='text-lg text-gray-600 text-base-content/60'>
                                Signup in to your account
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email Id</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input type="email"
                                    className={`input input-bordered w-full pl-10 bg-transparent`}
                                    placeholder='Email Id'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10 bg-transparent`}
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button type='button' onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center z-10'>
                                    {showPassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className='size-5 text-base-content/40' />}
                                </button>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                            {isLoggingIn ? <div className='flex justify-center items-center h-screen'>
                                <Loader2 className="size-12 animate-spin" />
                                Loading...
                            </div> : "Sign in"}
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className="text-base-content/60">
                            Don't have an account? {" "}
                            <Link to="/signup" className="link link-primary font-medium">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}
            <AuthImagePattern title="Welcome back!" subtitle="Login to continue your journey with friends" />
        </div>
    )
}

export default LoginPage
