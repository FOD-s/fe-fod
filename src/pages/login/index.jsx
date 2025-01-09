import { updateToken } from "@/features/auth/loginSlice";
import WithOutAuth from "@/hoc/WithOutAuth";
import { useToast } from "@/hooks/use-toast";
import useAuthService from "@/services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const formValues = {
	email: "",
	password: "",
};

const schema = yup.object().shape({
	email: yup.string().required("email is required"),
	password: yup.string().required("password is required"),
});

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: formValues,
	});

	const { toast } = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { loginAdmin } = useAuthService();

	const [typePassword, setTypePassword] = useState(true);

	const onSubmitLogin = async (data) => {
		try {
			const res = await loginAdmin(data);
			if (res?.status !== 200) {
				return toast({
					variant: "destructive",
					description: res.data.message,
				});
			}
			toast({
				description: res.data.message,
			});
			dispatch(updateToken(res.data.token));
			return navigate("/");
		} catch (error) {
			return toast({
				variant: "destructive",
				description: error.message,
			});
		}
	};

	return (
		<div className="bg-bg-neumorphism bg-center bg-cover h-screen w-full flex items-center justify-center [perspective:1000px]">
			<div className="w-3/4 lg:w-1/3 2xl:w-1/4 relative flip-card-inner transition-transform duration-700 transform-gpu [transform-style:preserve-3d] h-full flex items-center">
				<div className="[backface-visibility:hidden] gap-6 bg-bg-neumorphism shadow-neumorphism rounded-2xl p-10 w-full flex flex-col justify-center">
					<p className="text-2xl font-extrabold leading-6 text-gray-800 transition-all duration-500 focus:outline-none">
						Login to your account
					</p>
					<form onSubmit={handleSubmit(onSubmitLogin)}>
						<div>
							<label
								id="email"
								className="text-sm font-medium leading-none text-gray-800"
							>
								email
							</label>
							<input
								aria-labelledby="email"
								type="text"
								id="email"
								className="rounded text-xs font-medium leading-none text-gray-800 py-4 w-full pl-3 mt-2 bg-bg-neumorphism shadow-neumorphism-inner focus:shadow-neumorphism-inner focus:outline-none [autofill:bg-bg-neumorphism]"
								placeholder="Type email here ..."
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="w-full mt-6">
							<label className="text-sm font-medium leading-none text-gray-800">
								Password
							</label>
							<div className="relative flex items-center justify-center">
								<input
									name="password"
									id="password"
									type={`${typePassword ? "password" : "text"}`}
									className="w-full py-4 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 rounded bg-bg-neumorphism shadow-neumorphism-inner focus:shadow-neumorphism-inner focus:outline-none"
									placeholder="Type password here ..."
									{...register("password")}
								/>
								<div
									className="absolute right-0 mt-2 mr-3 cursor-pointer"
									onClick={() => setTypePassword(!typePassword)}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
											fill="#71717A"
										/>
									</svg>
								</div>
							</div>
							{errors.password && (
								<p className="text-red-500">{errors.password.message}</p>
							)}
						</div>
						<div className="mt-8 mb-6">
							<button
								type="submit"
								className={`text-sm font-semibold leading-none text-white py-4 w-full rounded focus:outline-none bg-indigo-700 transition-all duration-300 hover:shadow-neumorphism-hover active:shadow-neumorphism-inner shadow-neumorphism`}
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default WithOutAuth(Login);
