
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   gender: string;
//   age: number;
// }

// type AuthState = {
//   token: string | null;
//   user: User | null;
// };

// type UserStore = {
//   auth: AuthState;
//   login: (token: string) => void;
//   logout: () => void;
// };

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({
//       auth: {
//         token: null,
//         user: null,
//       },
//       login: (token: string) =>
//         set(() => ({
//           auth: { token, user: null },
//         })),
//       logout: () =>
//         set(() => ({
//           auth: { token: null, user: null },
//         })),
//     }),
//     {
//       name: "user-storage",
//       partialize: (state) => ({ auth: state.auth }),
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
}

type AuthState = {
  token: string | null;
  user: User | null;
};

type UserStore = {
  auth: AuthState;
  user: User | null;
  setUser: (user: User) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set: (partial: Partial<UserStore> | ((state: UserStore) => Partial<UserStore>)) => void) => ({
      auth: {
        token: null,
        user: null,
      },
      user: null,
      setUser: (user: User) =>
        set((state) => ({
          user,
          auth: { ...state.auth, user },
        })),
      login: (token: string) =>
        set(() => ({
          auth: { token, user: null },
          user: null,
        })),
      logout: () =>
        set(() => ({
          auth: { token: null, user: null },
          user: null,
        })),
    }),
    {
      name: "user-storage",
      partialize: (state: UserStore) => ({ auth: state.auth, user: state.user }),
    }
  )
);
