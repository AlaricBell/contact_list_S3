import { create } from "zustand";
import { produce } from "immer";
import { ContactType } from "@/modules/contact/types/ContactType";

interface ContactState {
	contact: ContactType;
	setContact: (
		key: keyof ContactType,
		value: ContactType[keyof ContactType]
	) => void;
	clearContact: () => void;
}

const defaultContact: ContactType = {
	id: null,
	createdAt: null,
	updatedAt: null,
	name: "",
	phone: "",
	email: "",
	avatar: "",
};

export const useContactStore = create<ContactState>()((set) => ({
	contact: defaultContact,
	setContact: (key, value) =>
		set((state) => ({
			contact: produce(state.contact, (draft) => {
				draft[key] = value as string;
			}),
		})),
	clearContact: () => set((state) => ({ contact: defaultContact })),
}));
