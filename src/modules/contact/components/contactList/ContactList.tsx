"use client";

import { ContactType } from "../../types/ContactType";
import ContactItem from "./ContactItem";
import "./contactList.scss";

type ContactProps = {
	contacts: ContactType[];
};

const ContactList = ({ contacts }: ContactProps) => {
	return (
		<div className='contact-list'>
			{contacts.map((contact, index) => (
				<ContactItem
					key={index}
					contact={{
						id: contact.id,
						createdAt: contact.createdAt,
						updatedAt: contact.updatedAt,
						name: contact.name,
						phone: contact.phone,
						email: contact.email,
						avatar: contact.avatar,
					}}
				/>
			))}
		</div>
	);
};

export default ContactList;
