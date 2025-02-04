import endpoint from "../endpoint";
import useApi from "@/services/method";

const useUserService = () => {
	const { GET, POST, PUT } = useApi();

	const getListUser = () => GET(`${endpoint.user}?`);
	const createUser = (dataBody) => POST(`${endpoint.user}`, dataBody);
	const updateUser = (id, dataBody) => PUT(`${endpoint.user}/${id}`, dataBody);

	return {
		getListUser,
		createUser,
		updateUser,
	};
};

export default useUserService;
