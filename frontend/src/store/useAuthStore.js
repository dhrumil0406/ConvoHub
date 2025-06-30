import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data, });

            get().connectSocket();
        } catch (error) {
            set({ authUser: null });
            console.error('Error checking authentication:', error.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data });
            await get().checkAuth();
            toast.success('Account created successfully!');
        } catch (error) {
            console.error('Error signing up:', error.message);
            toast.error(error.response?.data?.message);

            get().connectSocket();
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            set({ authUser: res.data });
            await get().checkAuth();
            toast.success('Logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error.message);
            toast.error(error.response?.data?.message);

            get().connectSocket()
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            if (get().socket) {
                get().socket.disconnect();
            }
            // set({ authUser: null });
            set({ authUser: null });
            // await get().checkAuth();
            toast.success('Logged out successfully!');

            get().disconnectSocket();
        } catch (error) {
            console.error('Error logging out:', error.message);
            toast.error(error.response?.data?.message);
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', formData);
            set({ authUser: res.data });
            await get().checkAuth();
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
            toast.error(error.response?.data?.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.conncted) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.conncted) {
            get().socket?.disconnect();
        }
    }
}));