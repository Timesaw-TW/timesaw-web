import { create } from "zustand";
import { ModalProps } from "@/components/util/Modal";

interface ModalState {
  modal: ModalProps | null;
  setModal: (modal: ModalProps) => void;
  closeModal: () => void;
}

const useModal = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal: ModalProps) => set(() => ({ modal })),
  closeModal: () => set(() => ({ modal: null })),
}));

export default useModal;
