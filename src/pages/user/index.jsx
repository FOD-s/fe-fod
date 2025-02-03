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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import DataTablePagination from "@/components/organisms/DataTablePagination";

function User(props) {
	const { getListUser } = useUserService();
	const [listData, setListData] = useState([]);

  const getListData = async () => {
		try {
			const res = await getListUser();
			setListData(res?.data.data);
			dispatch(updateTotalItem(res.data.paging.totalOrders));
		} catch (error) {
			console.log(error);
		}
	};

	const renderDatatable = (data) => {
		return (
			<DataTablePagination
				data={data}
				// handlePerRowsChange={handlePerRowsChange}
				// handleAdd={handleAdd}
				// handleDelete={handleDelete}
				// handleEdit={handleEdit}
				// handleDetail={handleDetail}
				// statusAksi={user.roleId == 1 ? "detailOnly" : "editAndDetail"}
				// handleApprove={handleApprove}
				// handleReview={handleReview}
			/>
		);
	};

  useEffect(()=>{
    getListData();
  },[])

	return (
		<>
			<h1>User</h1>
			{listData && renderDatatable(listData)}
		</>
	);
}

export default WithAuth(User);
