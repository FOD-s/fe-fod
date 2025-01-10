import WithAuth from "@/hoc/WithAuth";
import DataTablePagination from "@/components/organisms/DataTablePagination";
import useOrderService from "../../services/order";
import { useEffect, useState } from "react";

function Order() {
	const { getAllOrder } = useOrderService();

	let [listData, setListData] = useState([]);

	const getListOrder = async () => {
		try {
			const res = await getAllOrder();
			setListData(res?.data.data);
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
			/>
		);
	};

	useEffect(() => {
		getListOrder();
	}, []);

	return (
		<>
			<h1>Orders</h1>
			{listData && renderDatatable(listData)}
		</>
	);
}

export default WithAuth(Order);
