/* eslint-disable react/prop-types */
import SearchInput from "@/components/molecules/SearchInput";
import { Button } from "@/components/ui/button.tsx";
import { LOADING } from "@/features/loading/loadingSlice.js";
import {
	PAGINATION,
	updateLimit,
	updatePage,
} from "@/features/pagination/paginationSlice.js";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import {
	EyeIcon,
	PencilIcon,
	TrashIcon,
	EllipsisVerticalIcon,
	CheckIcon,
	DocumentTextIcon,
	ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainSkeleton from "../atoms/MainSkeleton";
import MessageEmptyData from "../atoms/MessageEmptyData";
import { formatDateYMD } from "@/utils/formatDate";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ChevronDown,
	ChevronUp,
	ChevronsLeft,
	Clock,
	FileCheck2Icon,
	FileOutputIcon,
} from "lucide-react";

// custom style header
let customStyles = {
	headCells: {
		style: {
			justifyContent: "center",
			fontWeight: "bolder",
		},
	},
};

let conditionalOverdue = [
	{
		when: (row) => row.overdue,
		style: {
			backgroundColor: "#dc3545",
			color: "#efefef",
		},
	},
];

const DataTablePagination = ({
	statusAksi,
	data,
	params,
	// handlePageChange,
	// handlePerRowsChange,
	currentRow,
	handleRowClicked,
	handleAdd,
	handleEdit,
	handleDelete,
	handleDetail,
	handleApprove,
	handleReview,
}) => {
	const dispatch = useDispatch();
	const user = useSelector(DATA_USER);
	const pagination = useSelector(PAGINATION);
	const loading = useSelector(LOADING);

	const navigate = useNavigate();
	let { page, limit, totalItem } = pagination;

	const handlePerRowsChange = (limit) => {
		dispatch(updateLimit(limit));
	};

	const handlePageChange = (page) => {
		dispatch(updatePage(page));
	};

	const renderLogo = (url) => {
		return (
			<span className="grid w-16 h-16 p-2 place-items-center">
				<img src={url} alt={url} className="w-full h-full rounded-xl" />
			</span>
		);
	};

	const renderStatus = (status) => {
		if (!status) {
			return <span className="flex items-center text-gray-500">-</span>;
		}

		switch (status) {
			case "APPROVED":
				return (
					<span className="flex items-center font-bold text-green-500">
						<FileCheck2Icon className="w-4 h-4 mr-1" /> {status}
					</span>
				);

			case "REVIEW":
				return (
					<span className="flex items-center font-bold text-orange-500">
						<FileOutputIcon className="w-4 h-4 mr-1" /> {status}
					</span>
				);

			default:
				return (
					<span className="flex items-center font-bold text-gray-500">
						<Clock className="w-4 h-4 mr-1" /> {status}
					</span>
				);
		}
	};

	let columns = [
		{
			name: "No.",
			cell: (row, index) => (page - 1) * limit + parseInt(index + 1),
			width: "5em",
			right: true,
			center: true,
		},
	];

	if (data?.length > 0) {
		let keys = Object.keys(data[0]);

		keys.forEach((key) => {
			switch (key) {
				case "logo":
					columns.push({
						name: "Logo",
						selector: (row) => row.logo,
						center: true,
						cell: (row) =>
							row.logo ? (
								renderLogo(row.logo)
							) : (
								<span className="w-full text-center">-</span>
							),
					});
					break;
				case "name":
					columns.push({
						name: "Name",
						selector: (row) => row.name,
						sortable: true,
						center: true,
						grow: 1,
						cell: (row) =>
							row.name ? (
								row.name
							) : (
								<span className="w-full text-center">-</span>
							),
					});
					break;
				case "sales":
					columns.push({
						name: "Sales",
						selector: (row) => row.sales,
						sortable: true,
					});
					break;
				case "productName":
					columns.push({
						name: "Model",
						selector: (row) => row.productName,
						sortable: true,
						center: true,
					});
					break;
				case "status":
					columns.push({
						name: "Status",
						selector: (row) => row.status,
						cell: (row) => {
							return renderStatus(row.status)
						},
						// sortable: true,
						center: true,
					});
					break;
				case "validator":
					columns.push({
						name: "Validator",
						selector: (row) => row.validator,
						// sortable: true,
						center: true,
					});
					break;
				case "type":
					columns.push({
						name: "Tipe",
						selector: (row) => row.type || "-",
						// sortable: true,
						center: true,
					});
					break;
				case "size":
					columns.push({
						name: "Ukuran",
						selector: (row) => row.size,
						// sortable: true,
						center: true,
					});
					break;
				case "material":
					columns.push({
						name: "Kain",
						selector: (row) => row.material,
						// sortable: true,
						center: true,
					});
					break;
				case "client":
					columns.push({
						name: "Konsumen",
						selector: (row) => row.client,
						// sortable: true,
						// center: true,
					});
					break;
				case "orderDate":
					columns.push({
						name: "Tanggal Order",
						selector: (row) => formatDateYMD(row.orderDate),
						// sortable: true,
						center: true,
						grow: 2,
					});
					break;
				// case "deliveryDate":
				// 	columns.push({
				// 		name: "Tanggal Pengiriman",
				// 		selector: (row) => row.deliveryDate,
				// 		// sortable: true,
				// 		center: true,
				// 		grow: 2,
				// 	});
				// 	break;
				case "note":
					columns.push({
						name: "Catatan",
						selector: (row) => row.note || "-",
						// sortable: true,
						center: true,
					});
					break;
				default:
					break;
			}
		});
	}

	// menampilkan action modal
	switch (statusAksi) {
		case "nonAction":
			break;
		case "editOnly":
			columns.push({
				name: "Action",
				cell: (row) => (
					<div
						className="flex w-full cursor-pointer justify-evenly"
						onClick={() => handleEdit(row)}
					>
						<PencilIcon className="w-5 h-5 text-orange-500" title="Ubah" />
					</div>
				),
				allowOverflow: true,
				button: true,
			});
			break;
		case "detailOnly":
			columns.push({
				name: "Action",
				cell: (row) => (
					<div
						className="flex w-full cursor-pointer justify-evenly"
						onClick={() => handleDetail(row.id)}
					>
						<EyeIcon className="w-5 h-5 text-blue-700" title="Detail" />
					</div>
				),
				allowOverflow: true,
				button: true,
			});
			break;
		case "validation":
			columns.push({
				name: "Action",
				cell: (row) => (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost" title="Action">
								<EllipsisVerticalIcon className="size-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button
									className="w-full p-1"
									variant="ghost"
									onClick={() => handleApprove(row)}
									title="Approve"
									disabled={row.status !== "PENDING"}
								>
									<CheckIcon className="text-green-600 size-5" />
									Approve
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									className="w-full p-1"
									variant="ghost"
									onClick={() => handleDetail(row.id)}
									title="Detail"
								>
									<EyeIcon className="text-blue-600 size-5" />
									Detail
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									className="w-full p-1"
									variant="ghost"
									onClick={() => handleReview(row.id)}
									title="Review"
									disabled={row.status !== "PENDING"}
								>
									<ArrowUturnLeftIcon className="text-orange-600 size-5" />
									Review
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
				allowOverflow: true,
				button: true,
			});
			break;
		case "editAndDetail":
			columns.push({
				name: "Aksi",
				cell: (row) => (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost" title="Action">
								<EllipsisVerticalIcon className="size-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button
									className="w-full p-1"
									variant="ghost"
									onClick={() => handleEdit(row.id)}
									title="Detail"
									disabled={row.status == "APPROVED"}
								>
									<PencilIcon className="text-yellow-600 size-5" />
									Edit
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									className="w-full p-1"
									variant="ghost"
									onClick={() => handleDetail(row.id)}
									title="Detail"
								>
									<EyeIcon className="text-blue-600 size-5" />
									Detail
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
				allowOverflow: true,
				button: true,
			});
			break;
		default:
			columns.push({
				name: "Action",
				cell: (row) => (
					<div className="flex w-full justify-evenly">
						{/* <EyeIcon
							className="w-5 h-5 text-blue-700 cursor-pointer"
							title="Detail"
							onClick={() => handleDetail(row)}
						/> */}

						<PencilIcon
							className="w-5 h-5 text-orange-500 cursor-pointer"
							title="Ubah"
							onClick={() => handleEdit(row.id)}
						/>

						<TrashIcon
							className="w-5 h-5 text-red-700 cursor-pointer"
							title="Hapus"
							onClick={() => handleDelete(row.id)}
						/>
					</div>
				),
				allowOverflow: true,
				button: true,
			});
			break;
	}

	const SubHeader = () => {
		return (
			<div
				className={`flex items-center ${
					user.roleId == 1 ? "justify-end" : "justify-between"
				} w-full px-3 bg-bg-neumorphism`}
			>
				<Button
					onClick={() => handleAdd()}
					className={user.roleId == 1 ? "hidden" : "flex"}
				>
					Add
				</Button>
				<SearchInput />
			</div>
		);
	};

	return (
		<section className="w-full px-5 py-3 overflow-auto rounded-lg bg-bg-neumorphism shadow-neumorphism">
			<DataTable
				className="datatable-custom bg-bg-neummorphism"
				columns={columns}
				data={data || []}
				defaultSortFieldId={1}
				pagination
				paginationServer
				paginationTotalRows={totalItem}
				paginationRowsPerPageOptions={[10, 25, 50, 100]}
				onChangeRowsPerPage={handlePerRowsChange}
				onChangePage={handlePageChange}
				responsive
				// highlightOnHover
				striped
				customStyles={customStyles}
				progressPending={loading}
				progressComponent={<MainSkeleton />}
				noDataComponent={<MessageEmptyData />}
				conditionalRowStyles={conditionalOverdue}
				subHeader
				subHeaderComponent={<SubHeader />}
			/>
		</section>
	);
};

export default DataTablePagination;
