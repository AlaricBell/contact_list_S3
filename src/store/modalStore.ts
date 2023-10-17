import { create } from "zustand";

interface ModalState {
	isOpen: boolean;
	content: React.ReactNode;
	setIsOpen: () => void;
	setContent: (element: React.ReactNode) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
	isOpen: false,
	content: null,
	setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
	setContent: (element) => set((state) => ({ content: element })),
}));
