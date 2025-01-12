import WithAuth from "@/hoc/WithAuth";
import DataTablePagination from "@/components/organisms/DataTablePagination";
import useOrderService from "@/services/order";
import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import { Button } from "@/components/ui/button";
import InputComponent from "@/components/molecules/Input";
import SelectComponent from "@/components/molecules/SelectCustom";
import Datepick from "../../components/molecules/Datepick";
import Checkbox from "@/components/molecules/Checkbox";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
	name: "",
	type: "",
};

const schemaForm = yup.object().shape({
	name: yup.string().required("Name is required"),
	type: yup.string().required("Type is required"),
});

const schemaFormEdit = yup.object().shape({
	name: yup.string().required("Name is required"),
	type: yup.string().required("Type is required"),
});

function Order() {
	const { getAllOrder } = useOrderService();

	let [listData, setListData] = useState([]);
	let [isDialogOpen, setIsDialogOpen] = useState(false);
	let [modalProps, setModalProps] = useState({
		title: "Add Order",
		type: "add",
	});
	const [startDate, setStartDate] = useState(new Date());
	const [openCollapse, setOpenCollapse] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
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
		watch: watchEdit,
		setValue: setValueEdit,
	} = useForm({
		resolver: yupResolver(schemaFormEdit),
		defaultValues: defaultValues,
	});

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
				handleAdd={handleAdd}
			// handleDelete={handleDelete}
			// handleEdit={handleEdit}
			/>
		);
	};

	const handleAdd = () => {
		setIsDialogOpen(true);
		setModalProps({
			title: "Add Order",
			type: "add",
		});
	};

	const resetModal = () => {
		reset();
		// resetEdit()
	};

	useEffect(() => {
		getListOrder();
	}, []);

	return (
		<>
			<h1>Orders</h1>
			{listData && renderDatatable(listData)}

			<Modal
				isDialogOpen={isDialogOpen}
				title={modalProps.title}
				onOpenChange={() => setIsDialogOpen(false)}
			>
				<ScrollArea className="h-[calc(100vh-5rem)] md:h-[calc(100vh-10rem)] w-full rounded-md p-4">
					<form
						//   onSubmit={
						//     modalProps.type == "add" || editLogo
						//       ? handleSubmit(submitForm)
						//       : handleSubmitEdit(submitForm)
						//   }
						className="flex flex-col h-full px-6 pb-6 w-full gap-3"
					>
						<div className="flex flex-col w-full border-b border-gray-500 pb-3 gap-2">
							<label className="text-lg">Konsumen</label>
							<InputComponent
								name="name"
								label="Nama"
								type="text"
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
							/>
							<InputComponent
								name="name"
								label="Alamat"
								type="text"
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
							/>
							<Datepick label={"Tanggal Pengiriman"} />
						</div>
						<div className="grid grid-cols-2 border-b border-gray-500 pb-3 gap-3">
							<label className="text-lg col-span-2">Produk</label>
							<SelectComponent
								name="type"
								label="Model"
								placeholder="Select type"
								// options={optionType}
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
							/>
							<InputComponent
								name="name"
								label="Ukuran"
								type="text"
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
							/>
							<SelectComponent
								name="type"
								label="Kain"
								placeholder="Select type"
								// options={optionType}
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
							/>
							<InputComponent
								name="name"
								label="Warna"
								type="text"
								control={
									modalProps.type == "add" || editLogo ? control : controlEdit
								}
								schema={
									modalProps.type == "add" || editLogo
										? schemaForm
										: schemaFormEdit
								}
								errors={
									modalProps.type == "add" || editLogo ? errors : errorsEdit
								}
							/>
						</div>
						<Collapsible open={openCollapse} onOpenChange={setOpenCollapse} className="h-full">
							<span className="flex justify-between">
								<label className="text-lg ">Custom</label>
								<CollapsibleTrigger>
									<Button variant="ghost" type="button">
										{openCollapse ? <ChevronUp /> : <ChevronDown />}
									</Button>
								</CollapsibleTrigger>
							</span>
							<CollapsibleContent>
								<div className="grid grid-cols-2 gap-3 pb-3">
									<SelectComponent
										name="type"
										label="Laci"
										placeholder="Select type"
										// options={optionType}
										control={
											modalProps.type == "add" || editLogo ? control : controlEdit
										}
										errors={
											modalProps.type == "add" || editLogo ? errors : errorsEdit
										}
										schema={
											modalProps.type == "add" || editLogo
												? schemaForm
												: schemaFormEdit
										}
									/>
									<InputComponent
										name="name"
										label="Item"
										type="text"
										control={
											modalProps.type == "add" || editLogo ? control : controlEdit
										}
										schema={
											modalProps.type == "add" || editLogo
												? schemaForm
												: schemaFormEdit
										}
										errors={
											modalProps.type == "add" || editLogo ? errors : errorsEdit
										}
									/>
									<SelectComponent
										name="type"
										label="Kancing"
										placeholder="Select type"
										// options={optionType}
										control={
											modalProps.type == "add" || editLogo ? control : controlEdit
										}
										errors={
											modalProps.type == "add" || editLogo ? errors : errorsEdit
										}
										schema={
											modalProps.type == "add" || editLogo
												? schemaForm
												: schemaFormEdit
										}
									/>
									<SelectComponent
										name="type"
										label="Amparan"
										placeholder="Select type"
										// options={optionType}
										control={
											modalProps.type == "add" || editLogo ? control : controlEdit
										}
										errors={
											modalProps.type == "add" || editLogo ? errors : errorsEdit
										}
										schema={
											modalProps.type == "add" || editLogo
												? schemaForm
												: schemaFormEdit
										}
									/>
									<Checkbox label="Double Sandaran" />
									<Checkbox label="Busa" />
								</div>
							</CollapsibleContent>
						</Collapsible>
						<div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:col-span-2 items-self-end">
							<Button type="submit">Submit</Button>
							<Button
								variant="secondary"
								type="button"
								onClick={() => resetModal()}
							>
								Reset
							</Button>
						</div>
					</form>
				</ScrollArea>
			</Modal>
		</>
	);
}

export default WithAuth(Order);
