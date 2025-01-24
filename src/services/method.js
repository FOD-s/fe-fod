import axios from "axios";
import { BASE_API } from "@/config/env";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { PAGINATION, SEARCH } from "@/features/pagination/paginationSlice";

const useApi = () => {
	const token = useSelector((state) => state.user.token);
	const pagination = useSelector(PAGINATION);
	const searchInput = useSelector(SEARCH);

	const api = axios.create({
		baseURL: BASE_API,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const POST_LOGIN = useCallback(
		async (path, dataBody) => {
			try {
				const response = await api.post(path, dataBody);
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const GET = useCallback(
		async (path) => {
			try {
				const response = await api.get(
					`${path}page=${pagination.page}&limit=${pagination.limit}&search=${searchInput}`
					// `${path}`
				);
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const POST = useCallback(
		async (path, dataBody) => {
			try {
				const response = await api.post(path, dataBody);
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const PUT = useCallback(
		async (path, dataBody) => {
			try {
				const response = await api.put(path, dataBody);
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const PATCH = useCallback(
		async (path, dataBody) => {
			try {
				const response = await api.patch(path, dataBody);
				return response.data;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const DELETE = useCallback(
		async (path) => {
			try {
				const response = await api.delete(path);
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	// FORM DATA

	const POST_FILE = useCallback(
		async (path, formData) => {
			try {
				const res = await api.post(path, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				return res;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	const PUT_FILE = useCallback(
		async (path, formData) => {
			try {
				const response = await api.put(path, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				return response;
			} catch (error) {
				return error.response;
			}
		},
		[api]
	);

	return { POST_LOGIN, GET, POST, PUT, PATCH, DELETE, POST_FILE, PUT_FILE };
};

export default useApi;
