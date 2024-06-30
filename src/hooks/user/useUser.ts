import { User } from "@/gql-requests/user/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
}));

export default useUser;
