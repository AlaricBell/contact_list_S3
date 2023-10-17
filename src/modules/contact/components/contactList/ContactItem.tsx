"use client";

import Image from "next/image";
import "./contactItem.scss";
import MuteIcon from "@/modules/common/components/icons/Mute";
import CallIcon from "@/modules/common/components/icons/Call";
import MoreIcon from "@/modules/common/components/icons/More";
import Dropdown from "@/modules/common/components/dropdown/Dropdown";
import SettingsIcon from "@/modules/common/components/icons/Settings";
import { useEffect, useState } from "react";
import { ContactType } from "../../types/ContactType";
import { useHover } from "@uidotdev/usehooks";
import FavouriteIcon from "@/modules/common/components/icons/Favourite";
import DeleteIcon from "@/modules/common/components/icons/Delete";
import { useDeleteContact } from "../../hooks/useDeleteContacts";
import useContacts from "../../hooks/useContacts";
import { useModalStore } from "@/store/modalStore";
import ContactForm from "../contactForm/ContactForm";
import { FormVariants } from "../../enums/formVariantsEnum";
import { useContactFormStore } from "@/store/contactFormStore";
import { motion } from "framer-motion";

type ContactProps = {
	contact: ContactType;
};

const ContactItem = ({ contact }: ContactProps) => {
	const setIsOpen = useModalStore((state) => state.setIsOpen);
	const setContent = useModalStore((state) => state.setContent);
	const setContactForm = useContactFormStore((state) => state.setContactForm);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [ref, hovering] = useHover<HTMLDivElement>();
	const { mutateAsync } = useDeleteContact();
	const { refetch } = useContacts();

	const { avatar, name, phone, id, email } = contact;

	useEffect(() => {
		if (!hovering) setIsVisible(false);
	}, [hovering]);

	const handleDeleteContact = async () => {
		if (id) {
			await mutateAsync(id);
			refetch();
		}
	};

	const handleEditContact = () => {
		setContactForm("id", contact.id);
		setContactForm("avatar", contact.avatar);
		setContactForm("avatarDisplay", contact.avatar);
		setContactForm("name", contact.name);
		setContactForm("phone", contact.phone);
		setContactForm("email", contact.email);
		setContent(<ContactForm variant={FormVariants.Edit} />);
		setIsOpen();
	};

	const fadeInVariants = {
		initial: {
			opacity: 0,
			translateX: -12,
		},
		animate: {
			opacity: 1,
			translateX: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div
			className='contact-item'
			ref={ref}
			initial='initial'
			animate='animate'
			variants={fadeInVariants}
		>
			<div className='contact-item-info'>
				<div className='contact-item-avatar'>
					<Image src={avatar} alt='' fill />
				</div>
				<div className='contact-item-details'>
					<h3 className='contact-item-name'>{name}</h3>
					<p className='contact-item-phone'>{phone}</p>
				</div>
			</div>
			<div className='contact-item-actions'>
				<div className='contact-item-action'>
					<MuteIcon />
				</div>
				<div className='contact-item-action'>
					<CallIcon />
				</div>
				<div
					className='contact-item-action'
					onClick={() => setIsVisible((prev) => !prev)}
				>
					<MoreIcon />
					<Dropdown
						isVisible={isVisible}
						options={[
							{
								icon: <SettingsIcon />,
								text: "Edit",
								action: handleEditContact,
							},
							{ icon: <FavouriteIcon />, text: "Favourite", action: () => {} },
							{
								icon: <DeleteIcon />,
								text: "Remove",
								action: async () => {
									await handleDeleteContact();
								},
							},
						]}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default ContactItem;
