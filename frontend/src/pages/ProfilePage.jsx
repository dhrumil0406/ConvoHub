import React, { useState } from 'react';
import { Camera, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const ProfilePage = () => {

    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file!");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error("Image size should be less than 2MB");
            return;
        }

        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        }
        reader.readAsDataURL(compressedFile);
    }

    return (
        <div className='min-h-screen'>
            <div className='max-w-2xl mx-auto p-4 pt-12'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                    {/* Profile Header */}
                    <div className="text-center mb-8">
                        <div className='flex flex-col items-center gap-2 group'>
                            {/* <div className='relative rounded-full bg-primary/10 flex items-center justify-center border-4 border-gray-400'>
                                <img src={authUser.profPic} alt="Profile" className='w-16 h-16 rounded-full object-cover absolute' />
                                <button className='z-10'><Camera className='size-7 text-base-content/40 rounded-full bg-green-600 mt-10 ml-10' /></button>
                            </div> */}
                            <h1 className='text-2xl font-bold mt-2'>Your Profile</h1>
                            <p className='text-sm text-zinc-400 text-base-content/60'>Your profile informarion</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            <img src={selectedImg || authUser.profPic || "/profile-img.jpg"} alt="profile" className='h-20 w-20 rounded-full object-cover border-4 ' />
                            <label htmlFor="profile-img" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""} `}>
                                <Camera className='w-5 h-5 text-base-200' />
                                <input
                                    type="file"
                                    id='profile-img'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className='text-sm text-zinc-400'>
                            {isUpdatingProfile ? 'Uploading...' : 'Click camera icon to update your profile'}
                        </p>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-400 flex items-center gap-2'>
                                <User className='w-4 h-4' />
                                Full Name
                            </div>
                            <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.fullName}</p>
                        </div>
                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-400 flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                Email Id
                            </div>
                            <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.email}</p>
                        </div>
                    </div>

                    <div className='mt-6 bg-base-300 rounded-xl p-6'>
                        <h2 className='text-lg font-medium mb-4'>Account Information</h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <span>Account Status</span>
                                <span className='text-green-500'>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
