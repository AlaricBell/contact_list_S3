"use client";

import Modal from "@/modules/common/components/modal/Modal";
import Contacts from "@/page/contact/Contacts";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
	return (
		<QueryClientProvider client={queryClient} contextSharing={true}>
			<main>
				<Contacts />
				<Modal />
			</main>
		</QueryClientProvider>
	);
}
