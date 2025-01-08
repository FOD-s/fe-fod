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
		const { checkValidateToken, getProfile } = useAuthService();
		const token = useSelector((state) => state.user.token);
		const navigate = useNavigate();
		const toast = useToast();
		const dispatch = useDispatch();

		const getProfil = async () => {
			try {
				const res = await getProfile();
				return dispatch(updateUser(res?.data));
			} catch (err) {
				return console.error(err);
			}
		};

		useEffect(() => {
			const validateToken = async (token) => {
				try {
					const res = await checkValidateToken({ token });
					if (res.status == 200) {
						return getProfil();
					} else {
						toast({
							variant: "destructive",
							description: "Sesi kadaluwarsa, silahkan login kembali",
						});
					}
				} catch (error) {
					dispatch(updateToken(""));
					navigate("/login");
				}
			};

			if (token) {
				validateToken(token);
			} else {
				navigate("/login");
			}
		}, [token, navigate]);

		return token ? <WrappedComponent {...props} /> : null;
	};
};

export default WithAuth;
