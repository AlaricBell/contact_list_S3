import { useQuery } from "react-query";

async function fetchContacts() {
	const response = await fetch("/api/contact");
	if (!response.ok) {
		throw new Error("Network response error");
	}
	return response.json();
}

export const useContacts = () => {
	const { data, isLoading, isError, refetch } = useQuery("data", fetchContacts);

	return { data, isLoading, isError, refetch };
};

export default useContacts;
