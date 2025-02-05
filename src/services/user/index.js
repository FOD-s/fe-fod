import endpoint from "../endpoint";
import useApi from "@/services/method";

const useUserService = () => {
	const { GET, POST, PUT, DELETE } = useApi();

	const getListUser = () => GET(`${endpoint.user}?`);
	const createUser = (dataBody) => POST(`${endpoint.user}`, dataBody);
	const updateUser = (id, dataBody) => PUT(`${endpoint.user}/${id}`, dataBody);
  const getUserById = (id) => GET(`${endpoint.user}/${id}?`);
  const deleteUser = (id) => DELETE(`${endpoint.user}/${id}`);

	return {
		getListUser,
		createUser,
		updateUser,
    getUserById,
    deleteUser
	};
};

export default useUserService;
