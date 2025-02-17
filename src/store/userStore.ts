import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define the Zustand store state and actions
interface UserStore {
  isAuthenticated: boolean;
  user: TUser | null;
  login: (userInfo: TUser) => void;
  logout: () => void;
}

// Zustand store with persistence and devtools
const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,

        login: (userInfo: TUser) => {
          set({ isAuthenticated: true, user: userInfo });
        },

        logout: () => {
          set({ isAuthenticated: false, user: null });
        }
      }),
      { name: 'user-store' } // Key for localStorage
    )
  )
);

export default useUserStore;
