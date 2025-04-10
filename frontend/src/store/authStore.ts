// import { create } from 'zustand';

// interface User {
//   id: string;
//   email: string;
//   character: {
//     level: number;
//     strength: number;
//     weight: number;
//     coins: number;
//   };
//   inventory: {
//     food: any[];
//     clothes: any[];
//   };
// }

// interface AuthState {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   updateCoins: (amount: number) => void;
// }

// // Helper function to generate a simple unique ID
// const generateId = () => Math.random().toString(36).substr(2, 9);

// export const useAuthStore = create<AuthState>((set, get) => ({
//   user: (() => {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   })(),
//   loading: false,
//   signIn: async (email: string, password: string) => {
//     set({ loading: true });
//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       const user = users.find((u: any) => u.email === email && u.password === password);
      
//       if (!user) {
//         throw new Error('Invalid email or password');
//       }
      
//       const { password: _, ...userWithoutPassword } = user;
//       localStorage.setItem('user', JSON.stringify(userWithoutPassword));
//       set({ user: userWithoutPassword, loading: false });
//     } catch (error: any) {
//       set({ loading: false });
//       throw new Error(error.message || 'Failed to sign in');
//     }
//   },
//   signUp: async (email: string, password: string) => {
//     set({ loading: true });
//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
      
//       if (users.some((u: any) => u.email === email)) {
//         throw new Error('Email already in use');
//       }
      
//       const newUser = {
//         id: generateId(),
//         email,
//         password,
//         character: {
//           level: 1,
//           strength: 10,
//           weight: 'normal',
//           coins: 1000, // Starting coins
//         },
//         inventory: {
//           food: [],
//           clothes: [],
//         },
//       };
      
//       users.push(newUser);
//       localStorage.setItem('users', JSON.stringify(users));
      
//       const { password: _, ...userWithoutPassword } = newUser;
//       localStorage.setItem('user', JSON.stringify(userWithoutPassword));
//       set({ user: userWithoutPassword, loading: false });
//     } catch (error: any) {
//       set({ loading: false });
//       throw new Error(error.message || 'Failed to sign up');
//     }
//   },
//   signOut: () => {
//     localStorage.removeItem('user');
//     set({ user: null });
//   },
  
//   updateCoins: (amount: number) => {
//     const currentUser = get().user;
//     if (!currentUser) return;
    
//     const updatedUser = {
//       ...currentUser,
//       character: {
//         ...currentUser.character,
//         coins: currentUser.character.coins + amount
//       }
//     };
    
//     localStorage.setItem('user', JSON.stringify(updatedUser));
    
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const updatedUsers = users.map((u: any) => 
//       u.id === currentUser.id ? { ...u, character: { ...u.character, coins: u.character.coins + amount } } : u
//     );
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
    
//     set({ user: updatedUser });
//   },
// }));