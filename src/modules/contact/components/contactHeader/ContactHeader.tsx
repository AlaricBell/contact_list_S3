"use client";

import Button from "@/modules/common/components/buttons/Button";
import SettingsIcon from "@/modules/common/components/icons/Settings";
import { ButtonTypes, ButtonVariants } from "@/modules/common/enums/buttonEnum";
import Image from "next/image";
import localFont from "next/font/local";
import "./contactHeader.scss";
import { useModalStore } from "@/store/modalStore";
import ContactForm from "../contactForm/ContactForm";
import { FormVariants } from "../../enums/formVariantsEnum";

const Gylsa = localFont({
	src: "../../../../fonts/Glysa.otf",
});

const ContactHeader = () => {
	const setIsOpen = useModalStore((state) => state.setIsOpen);
	const setContent = useModalStore((state) => state.setContent);

	const handleAddContact = () => {
		setContent(<ContactForm variant={FormVariants.Add} />);
		setIsOpen();
	};

	return (
		<div className='contacts-header'>
			<h1 className={`${Gylsa.className} contacts-header-title`}>Contacts</h1>
			<div className='contacts-header-actions'>
				<SettingsIcon className='contacts-header-action' />
				<Image
					src='/images/avatars/ProfilePic.svg'
					alt=''
					width={24}
					height={24}
					className='contacts-header-action'
				/>
				<Button
					text='Add new'
					variant={ButtonVariants.Rounded}
					type={ButtonTypes.Full}
					className='contacts-header-action'
					onClick={handleAddContact}
				/>
			</div>
		</div>
	);
};

export default ContactHeader;
