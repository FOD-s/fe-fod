import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useUserService from "../../services/user";

import {
	PAGINATION,
	SEARCH,
	updateLimit,
	updatePage,
	updateTotalItem,
} from "@/features/pagination/paginationSlice";
import WithAuth from "@/hoc/WithAuth";
import SearchInput from "@/components/molecules/SearchInput";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import { Button } from "@/components/ui/button";
import Modal from "@/components/molecules/Modal";
import InputComponent from "@/components/molecules/Input";
import SelectComponent from "@/components/molecules/SelectCustom";
import { useToast } from "@/hooks/use-toast";
import { OPTIONS_ROLE } from "@/utils/constant";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import DataTablePagination from "@/components/organisms/DataTablePagination";

const MySwal = withReactContent(Swal);

const defaultValues = {
	name: "",
	email: "",
	password: "",
	roleId: "",
};

const schemaForm = yup.object().shape({
	name: yup.string().required("name is required"),
	email: yup.string().required("email is required"),
	password: yup.string().required("password is required"),
	roleId: yup.string().required("role is required"),
});

const schemaFormEdit = yup.object().shape({
	name: yup.string().required("name is required"),
	email: yup.string().required("email is required"),
	roleId: yup.string().required("role is required"),
});

function User(props) {
	const dispatch = useDispatch();
	const { getListUser, createUser, updateUser, getUserById, deleteUser } =
		useUserService();
	const user = useSelector(DATA_USER);
	const [openModal, setOpenModal] = useState(false);
	let [modalProps, setModalProps] = useState({
		title: "Add Cabang",
		type: "add",
	});
	const { toast } = useToast();

	const [listData, setListData] = useState([]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(schemaForm),
		defaultValues: defaultValues,
	});

	const {
		control: controlEdit,
		handleSubmit: handleSubmitEdit,
		formState: { errors: errorsEdit },
		reset: resetEdit,
		setValue: setValueEdit,
	} = useForm({
		resolver: yupResolver(schemaFormEdit),
		defaultValues: defaultValues,
	});

	const handleAdd = () => {
		setModalProps({
			title: "Add User",
			type: "add",
		});
		setOpenModal(true);
	};

	const handleEdit = (id) => {
		setModalProps({
			title: "Edit User",
			type: "edit",
		});
		setOpenModal(true);
		getUser(id);
	};

	const getUser = async (id) => {
		try {
			const res = await getUserById(id);
			setFormEdit(res?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const setFormEdit = (data) => {
		setValueEdit("id", data.id);
		setValueEdit("name", data.name);
		setValueEdit("email", data.email);
		setValueEdit("roleId", data.roleId);
	};

	const getListData = async () => {
		try {
			const res = await getListUser();
			setListData(res?.data.data);
			dispatch(updateTotalItem(res.data.paging.totalOrders));
		} catch (error) {
			console.log(error);
		}
	};

	const SubHeader = () => {
		return (
			<div
				className={`flex items-center justify-between gap-3
				w-full bg-bg-neumorphism`}
			>
				<Button onClick={() => handleAdd()}>Add</Button>
				<SearchInput />
			</div>
		);
	};

	const renderDatatable = (data) => {
		return (
			<DataTablePagination
				data={data}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				subHeaderComponent={<SubHeader />}
			/>
		);
	};

	const submitForm = async (data) => {
		try {
			let res;
			modalProps.type == "add"
				? (res = await createUser(data))
				: (res = await updateUser(data.id, data));

			if (res.status !== 200) {
				return toast({
					variant: "destructive",
					description: res.data.error,
				});
			}
			toast({
				description: res.data.message,
			});
			setOpenModal(false);
			getListData();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		MySwal.fire({
			title: "Perhatian",
			text: "Apakah anda yakin untuk menghapus user tersebut ?",
			confirmButtonText: "Ya",
			showCancelButton: true,
			cancelButtonText: `Batal`,
			icon: "question",
			confirmButtonColor: "#ff0000",
			preConfirm: async () => {
				try {
					const res = await deleteUser(id);
					return res;
				} catch (error) {
					toast({
						variant: "destructive",
						title: "Error",
						description: error?.message,
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed) {
				toast({
					title: "Berhasil",
					description: "User berhasil dihapus.",
				});
			}
			getListData();
		});
	};

	useEffect(() => {
		getListData();
	}, []);

	useEffect(() => {
		if (!openModal) {
			reset();
			resetEdit();
		}
	}, [openModal]);

	return (
		<>
			<h1>User</h1>
			{listData && renderDatatable(listData)}

			<Modal
				isDialogOpen={openModal}
				title={modalProps.title}
				onOpenChange={() => setOpenModal(false)}
			>
				<form
					className="flex flex-col gap-3 px-6"
					onSubmit={
						modalProps.type == "add"
							? handleSubmit(submitForm)
							: handleSubmitEdit(submitForm)
					}
				>
					<InputComponent
						name="name"
						label="Nama"
						type="text"
						control={modalProps.type == "add" ? control : controlEdit}
						schema={modalProps.type == "add" ? schemaForm : schemaFormEdit}
						errors={modalProps.type == "add" ? errors : errorsEdit}
						disabled={modalProps.type == "detail"}
					/>
					<div className="grid w-full grid-flow-col gap-3">
						<InputComponent
							name="email"
							label="Email"
							type="email"
							control={modalProps.type == "add" ? control : controlEdit}
							schema={modalProps.type == "add" ? schemaForm : schemaFormEdit}
							errors={modalProps.type == "add" ? errors : errorsEdit}
							disabled={modalProps.type == "detail"}
						/>
						{modalProps.type != "edit" && (
							<InputComponent
								name="password"
								label="Password"
								type="password"
								control={modalProps.type == "add" ? control : controlEdit}
								schema={modalProps.type == "add" ? schemaForm : schemaFormEdit}
								errors={modalProps.type == "add" ? errors : errorsEdit}
								disabled={modalProps.type == "detail"}
							/>
						)}
					</div>
					<SelectComponent
						name="roleId"
						label="Role"
						placeholder="Pilih"
						options={OPTIONS_ROLE}
						control={modalProps.type == "add" ? control : controlEdit}
						errors={modalProps.type == "add" ? errors : errorsEdit}
						schema={modalProps.type == "add" ? schemaForm : schemaFormEdit}
						disabled={modalProps.type == "detail"}
					/>
					<div className="grid grid-cols-1 gap-3 py-6 mt-3 border-t border-gray-500 lg:grid-cols-2 lg:col-span-2 items-self-end">
						<Button type="submit" disabled={modalProps.type == "detail"}>
							Submit
						</Button>
						<Button
							variant="secondary"
							type="button"
							onClick={() => (modalProps.type == "add" ? reset() : resetEdit())}
							disabled={modalProps.type == "detail"}
						>
							Reset
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
}

export default WithAuth(User);
