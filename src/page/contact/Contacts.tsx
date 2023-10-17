"use client";

import "./contacts.scss";
import ContactList from "@/modules/contact/components/contactList/ContactList";
import ContactHeader from "@/modules/contact/components/contactHeader/ContactHeader";
import Sidebar from "@/modules/common/components/sidebar/Sidebar";
import { SidebarVariants } from "@/modules/common/enums/SidebarEnum";
import useContacts from "@/modules/contact/hooks/useContacts";

const Contacts = () => {
	const { data } = useContacts();

	return (
		<section id='contacts'>
			<Sidebar variant={SidebarVariants.Left} />
			<div className='contacts'>
				<ContactHeader />
				<ContactList contacts={data ? data.data : []} />
			</div>
			<Sidebar variant={SidebarVariants.Right} />
		</section>
	);
};

export default Contacts;
