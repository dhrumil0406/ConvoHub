import React from 'react'
import { Link } from 'react-router-dom'

const AuthImagePattern = ({title, subtitle}) => {
    return (
        <div className="hidden lg:flex bg-base-200 p-12 justify-center items-center">
            <div className='text-center max-w-md text-white'>
                <img
                    src="/convoHubLogo.png"
                    alt="Welcome"
                    className="w-auto h-36 mx-auto mb-6"
                />
                <h1 className='text-3xl font-bold mb-4'>{title}</h1>
                <p className='mb-6 text-lg'>{subtitle}</p>
                {/* <Link to="/login" className='btn btn-secondary'>
                    Sign In
                </Link> */}
            </div>
        </div>
    )
}

export default AuthImagePattern
