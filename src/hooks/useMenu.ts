import { create } from "zustand";

interface MenuState {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const useMenu = create<MenuState>((set) => ({
  opened: false,
  setOpened: (opened: boolean) => set(() => ({ opened })),
}));

export default useMenu;
