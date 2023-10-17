import { useMutation } from "react-query";

const deleteContact = async (id: string) => {
	const response = await fetch(`/api/contact?id=${id}`, {
		method: "DELETE",
	});
	return response;
};

export function useDeleteContact() {
	return useMutation(deleteContact);
}
