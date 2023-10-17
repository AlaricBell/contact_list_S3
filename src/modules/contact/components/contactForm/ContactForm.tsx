"use client";

import Image from "next/image";
import localFont from "next/font/local";
import Button from "@/modules/common/components/buttons/Button";
import TextInput from "@/modules/common/components/inputs/TextInput/TextInput";
import "./contactForm.scss";
import { ButtonTypes, ButtonVariants } from "@/modules/common/enums/buttonEnum";
import DeleteIcon from "@/modules/common/components/icons/Delete";
import { ChangeEvent, useRef } from "react";
import AddIcon from "@/modules/common/components/icons/Add";
import ChangeIcon from "@/modules/common/components/icons/Change";
import { useContactFormStore } from "@/store/contactFormStore";
import { useModalStore } from "@/store/modalStore";
import useContacts from "../../hooks/useContacts";
import { FormVariants } from "../../enums/formVariantsEnum";

type FormProps = {
	variant: FormVariants;
};

const Gylsa = localFont({
	src: "../../../../fonts/Glysa.otf",
});

const ContactForm = ({ variant }: FormProps) => {
	const ref = useRef<HTMLInputElement | null>(null);
	const contactForm = useContactFormStore((state) => state.contactForm);
	const setContactForm = useContactFormStore((state) => state.setContactForm);
	const clearContactForm = useContactFormStore(
		(state) => state.clearContactForm
	);
	const setIsOpen = useModalStore((state) => state.setIsOpen);
	const { refetch } = useContacts();

	const handleClose = () => {
		clearContactForm();
		setIsOpen();
	};

	const clearAvatar = () => {
		setContactForm("avatarDisplay", "/images/avatars/Default.svg");
		setContactForm("avatar", null);
		if (ref.current) {
			ref.current.value = "";
		}
	};

	const handleButtonClick = () => {
		if (ref.current) {
			ref.current.click();
		}
	};

	const readFile = (file: File) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			setContactForm("avatarDisplay", event.target?.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			setContactForm("avatar", file);
			readFile(file);
		} else {
			setContactForm("avatar", null);
			setContactForm("avatarDisplay", "/images/avatars/Default.svg");
		}
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		if (
			contactForm.name === "" ||
			contactForm.phone === "" ||
			contactForm.email === ""
		) {
			return;
		}

		if (contactForm.avatar) {
			formData.append("image", contactForm.avatar);
		}
		if (variant === FormVariants.Edit && contactForm.id) {
			formData.append("id", contactForm.id);
		}
		formData.append("name", contactForm.name);
		formData.append("phone", contactForm.phone);
		formData.append("email", contactForm.email);

		const response =
			variant === FormVariants.Add
				? await fetch("/api/contact", {
						method: "POST",
						body: formData,
				  })
				: await fetch("/api/contact", {
						method: "PUT",
						body: formData,
				  });
		if (response.status === 200) {
			handleClose();
			refetch();
		}
	};

	return (
		<div>
			<h2 className={Gylsa.className}>
				{variant === FormVariants.Add ? "Add" : "Edit"} contact
			</h2>
			<div className='form-image-group'>
				<Image
					src={contactForm.avatarDisplay ?? "/images/avatars/Default.svg"}
					alt=''
					width={88}
					height={88}
					className='form-image'
				/>
				<Button
					text={contactForm.avatar ? "Edit picture" : "Add picture"}
					onClick={handleButtonClick}
					type={ButtonTypes.Full}
					className='form-btn'
					icon={contactForm.avatar ? <ChangeIcon /> : <AddIcon />}
				></Button>
				{contactForm.avatar ? (
					<Button
						onClick={clearAvatar}
						icon={<DeleteIcon />}
						type={ButtonTypes.Icon}
					/>
				) : null}
				<input
					type='file'
					accept='image/*'
					className='form-image-input'
					ref={ref}
					onChange={handleImageUpload}
				/>
			</div>
			<TextInput
				label='Name'
				placeholder='Jamie Wright'
				value={contactForm.name}
				onChange={(value) => setContactForm("name", value)}
			/>
			<TextInput
				label='Phone number'
				placeholder='+01 234 5678'
				value={contactForm.phone}
				onChange={(value) => setContactForm("phone", value)}
			/>
			<TextInput
				label='Email address'
				placeholder='jamie.wright@mail.com'
				value={contactForm.email}
				onChange={(value) => setContactForm("email", value)}
			/>
			<div className='form-actions'>
				<Button
					className='form-action'
					onClick={handleClose}
					text='Cancel'
					variant={ButtonVariants.Secondary}
				/>
				<Button className='form-action' onClick={handleSubmit} text='Done' />
			</div>
		</div>
	);
};

export default ContactForm;
