import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data, });
        } catch (error) {
            set({ authUser: null });
            console.error('Error checking authentication:', error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data });
            toast.success('Account created successfully!');
        } catch (error) {
            console.error('Error signing up:', error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    
    login: async (formData) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            set({ authUser: res.data });
            toast.success('Logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out successfully!');
        } catch (error) {
            console.error('Error logging out:', error.message);
            toast.error(error.response.data.message);
        }
    },
    
    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', formData);
            set({ authUser: res.data });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}));