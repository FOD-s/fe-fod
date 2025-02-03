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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import DataTablePagination from "@/components/organisms/DataTablePagination";

function User(props) {
	const dispatch = useDispatch();
	const { getListUser } = useUserService();
	const user = useSelector(DATA_USER);
	const [openModal, setOpenModal] = useState(false);
	let [modalProps, setModalProps] = useState({
		title: "Add Cabang",
		type: "add",
	});

	const [listData, setListData] = useState([]);

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

	useEffect(() => {
		getListData();
	}, []);

	return (
		<>
			<h1>User</h1>
			{listData && renderDatatable(listData)}

			<Modal
				isDialogOpen={openModal}
				title={modalProps.title}
				onOpenChange={() => setOpenModal(false)}
			></Modal>
		</>
	);
}

export default WithAuth(User);
