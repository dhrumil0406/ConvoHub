import { create } from 'zustand';
import { THEMES } from '../constants'; // or wherever you store THEMES

export const useThemeStore = create((set) => {
    const defaultTheme = localStorage.getItem("chat-theme") || THEMES[0];

    return {
        theme: defaultTheme,
        setTheme: (newTheme) => {
            if (!THEMES.includes(newTheme)) return;
            localStorage.setItem("chat-theme", newTheme);
            set({ theme: newTheme });
        },
        toggleTheme: () => {
            set((state) => {
                const currentIndex = THEMES.indexOf(state.theme);
                const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
                localStorage.setItem("chat-theme", nextTheme);
                return { theme: nextTheme };
            });
        },
    };
});
