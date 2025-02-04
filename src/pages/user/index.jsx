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
import { use } from "react";

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

function User(props) {
	const dispatch = useDispatch();
	const { getListUser, createUser, updateUser } = useUserService();
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
	} = useForm({
		resolver: yupResolver(schemaForm),
		defaultValues: defaultValues,
	});

	const handleAdd = () => {
		setModalProps({
			title: "Add User",
			type: "add",
		});
		setOpenModal(true);
	};

	const handleEdit = () => {
		setModalProps({
			title: "Edit User",
			type: "edit",
		});
		setOpenModal(true);
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
				// handlePerRowsChange={handlePerRowsChange}
				// handleDelete={handleDelete}
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

	useEffect(() => {
		getListData();
	}, []);

	useEffect(() => {
		if (!openModal) {
			reset();
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
					onSubmit={handleSubmit(submitForm)}
				>
					<InputComponent
						name="name"
						label="Nama"
						type="text"
						control={control}
						schema={schemaForm}
						errors={errors}
						disabled={modalProps.type == "detail"}
					/>
					<div className="grid w-full grid-flow-col gap-3">
						<InputComponent
							name="email"
							label="Email"
							type="email"
							control={control}
							schema={schemaForm}
							errors={errors}
							disabled={modalProps.type == "detail"}
						/>
						<InputComponent
							name="password"
							label="Password"
							type="password"
							control={control}
							schema={schemaForm}
							errors={errors}
							disabled={modalProps.type == "detail"}
						/>
					</div>
					<SelectComponent
						name="roleId"
						label="Role"
						placeholder="Pilih"
						options={OPTIONS_ROLE}
						control={control}
						errors={errors}
						schema={schemaForm}
						disabled={modalProps.type == "detail"}
					/>
					<div className="grid grid-cols-1 gap-3 py-6 mt-3 border-t border-gray-500 lg:grid-cols-2 lg:col-span-2 items-self-end">
						<Button type="submit" disabled={modalProps.type == "detail"}>
							Submit
						</Button>
						<Button
							variant="secondary"
							type="button"
							onClick={() => reset()}
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
