import { create } from "zustand";
import { produce } from "immer";
import { ContactFormType } from "@/modules/contact/types/ContactFormType";

interface ContactState {
	contactForm: ContactFormType;
	setContactForm: (
		key: keyof ContactFormType,
		value: ContactFormType[keyof ContactFormType]
	) => void;
	clearContactForm: () => void;
}

const defaultContactForm: ContactFormType = {
	name: "",
	phone: "",
	email: "",
	avatar: null,
	avatarDisplay: "/images/avatars/Default.svg",
};

export const useContactFormStore = create<ContactState>()((set) => ({
	contactForm: defaultContactForm,
	setContactForm: (key, value) =>
		set((state) => ({
			contactForm: produce(state.contactForm, (draft) => {
				if (key === "avatar") draft[key] = value as File | null;
				else draft[key] = value as string;
			}),
		})),
	clearContactForm: () => set((state) => ({ contactForm: defaultContactForm })),
}));
