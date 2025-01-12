/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { updateUser, updateToken } from "@/features/auth/loginSlice";
import { useToast } from "@/hooks/use-toast";
import useAuthService from "@/services/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
	return (props) => {
		const { authMe } = useAuthService();
		const token = useSelector((state) => state.user.token);
		const navigate = useNavigate();
		const toast = useToast();
		const dispatch = useDispatch();

		useEffect(() => {
			const getProfile = async () => {
				try {
					const res = await authMe();
					if (res.status !== 200) {
						return toast({
							variant: "destructive",
							description: "Sesi kadaluwarsa, silahkan login kembali",
						});
					}
					return dispatch(updateUser(res?.data.data));
				} catch (err) {
					dispatch(updateToken(""));
					navigate("/login");
				}
			};

			if (token) {
				getProfile();
			} else {
				navigate("/login");
			}
		}, [token, navigate]);

		return token ? <WrappedComponent {...props} /> : null;
	};
};

export default WithAuth;
