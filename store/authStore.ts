import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone: string, address: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Stockage temporaire des utilisateurs (en attendant la vraie base de données)
const USERS_KEY = 'cpworks_users';
const ADMIN_EMAIL = 'admin@cpworks.com';
const ADMIN_PASSWORD = 'admin123';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email, password) => {
        // Admin login
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser: User = {
            id: 'admin-1',
            email: ADMIN_EMAIL,
            name: 'Administrateur',
            isAdmin: true,
          };
          set({ user: adminUser });
          return true;
        }

        // User login
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword });
          return true;
        }

        return false;
      },

      signup: async (name, email, password, phone, address) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        // Vérifier si l'email existe déjà
        if (users.find((u: any) => u.email === email)) {
          return false;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // En production, il faut hasher le mot de passe!
          phone,
          address,
          isAdmin: false,
          created_at: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword });
        return true;
      },

      logout: () => set({ user: null }),

      isAuthenticated: () => {
        const state = get();
        return state.user !== null;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
