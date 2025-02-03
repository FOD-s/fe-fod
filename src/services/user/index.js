import endpoint from "../endpoint";
import useApi from "@/services/method";

const useUserService = () => {
	const { GET, POST, PUT } = useApi();

	const getListUser = () => GET(`${endpoint.user}?`);

	return {
		getListUser,
	};
};

export default useUserService;
