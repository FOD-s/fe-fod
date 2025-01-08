/* eslint-disable no-unused-vars */
import endpoint from "../endpoint";
import useApi from "@/services/method";

const useAuthService = () => {
	const { GET, POST, PUT, PATCH, DELETE, POST_LOGIN } = useApi();

	// POST_LOGIN
	// const login = (dataBody) => POST_LOGIN(`${endpoint.reqToken}`, dataBody);

	// GET
	const getUsers = () => GET(`${endpoint.user}`);
	const getProfile = () => GET(`${endpoint.profileAdmin}`);
	const checkValidateToken = (dataBody) =>
		POST_LOGIN(`${endpoint.checkValidateToken}`, dataBody);

	// POST
	const login = (dataBody) =>
		POST_LOGIN(`${endpoint.login}`, dataBody);

	// PUT

	// PATCH

	// DELETE
	const logoutAdmin = () => DELETE(`${endpoint.logoutAdmin}`);

	return { getUsers, getProfile, checkValidateToken, login, logoutAdmin };
};

export default useAuthService;
