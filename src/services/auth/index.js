/* eslint-disable no-unused-vars */
import endpoint from "../endpoint";
import useApi from "@/services/method";

const useAuthService = () => {
	const { GET, POST, PUT, PATCH, DELETE, POST_LOGIN } = useApi();

	// GET
	const authMe = () => GET(`${endpoint.authMe}`);
	const getUsers = () => GET(`${endpoint.user}`);
	const getProfile = () => GET(`${endpoint.authMe}`);
	// POST
	const loginAdmin = (dataBody) =>
		POST_LOGIN(`${endpoint.loginAdmin}`, dataBody);

	// PUT

	// PATCH

	// DELETE
	const logoutAdmin = () => POST(`${endpoint.logoutAdmin}`);

	return {
		getUsers,
		getProfile,
		loginAdmin,
		logoutAdmin,
		authMe,
	};
};

export default useAuthService;
