import Checkbox from "@/components/molecules/Checkbox";
import InputComponent from "@/components/molecules/Input";
import SelectComponent from "@/components/molecules/SelectCustom";
import DataTablePagination from "@/components/organisms/DataTablePagination";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import WithAuth from "@/hoc/WithAuth";
import useOrderService from "@/services/order";
import useSelectService from "@/services/select";
import { ChevronDown, ChevronUp, ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Datepick from "../../components/molecules/Datepick";

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
	const [startDate, setStartDate] = useState(new Date());
	const [openCollapse, setOpenCollapse] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [modalProps, setModalProps] = useState({
		title: "Add Order",
		type: "add",
	});
	const {
		getDropdownProduct,
		getDropdownMaterial,
		getDropdownDrawer,
		getDropdownButton,
		getDropdownCover,
	} = useSelectService();
	const [pageForm, setPageForm] = useState(true);

	let [listData, setListData] = useState([]);
	let [optionsProducts, setOptionsProducts] = useState([]);
	let [optionsMaterials, setOptionsMaterials] = useState([]);
	let [optionsDrawer, setOptionsDrawers] = useState([]);
	let [optionsButton, setOptionsButtons] = useState([]);
	let [optionsCover, setOptionsCovers] = useState([]);
	let [productPrice, setProductPrice] = useState(0);
	let [customPrice, setCustomPrice] = useState(0);
	let [totalPrice, setTotalPrice] = useState(0);

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
		// setIsDialogOpen(true);
		// setModalProps({
		// 	title: "Add Order",
		// 	type: "add",
		// });
		setPageForm(true);
	};

	const resetModal = () => {
		reset();
		// resetEdit()
	};

	const getOptionProduct = async () => {
		try {
			const res = await getDropdownProduct();
			setOptionsProducts(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getOptionMaterial = async () => {
		try {
			const res = await getDropdownMaterial();
			setOptionsMaterials(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getOptionDrawer = async () => {
		try {
			const res = await getDropdownDrawer();
			setOptionsDrawers(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getOptionButton = async () => {
		try {
			const res = await getDropdownButton();
			setOptionsButtons(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getOptionCover = async () => {
		try {
			const res = await getDropdownCover();
			setOptionsCovers(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getListOrder();
		getOptionProduct();
		getOptionMaterial();
		getOptionDrawer();
		getOptionButton();
		getOptionCover();
	}, []);

	useEffect(() => {
		console.log(pageForm);
	}, [pageForm]);

	return (
		<>
			{!pageForm ? (
				<>
					<h1>Orders</h1>
					{listData && renderDatatable(listData)}
				</>
			) : (
				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<h1>Add Order</h1>
						<Button variant="ghost" onClick={() => setPageForm(false)}>
							<ChevronsLeft /> Kembali
						</Button>
					</div>
					<div className="grid grid-cols-3 p-4 rounded-md shadow-neumorphism">
						<form
							//   onSubmit={
							//     modalProps.type == "add" || editLogo
							//       ? handleSubmit(submitForm)
							//       : handleSubmitEdit(submitForm)
							//   }
							className="flex flex-col w-full h-full col-span-2 gap-3 px-6 pb-6"
						>
							<div className="flex flex-col w-full gap-2 pb-3 border-b border-gray-500">
								<h2 className="font-bold">Konsumen</h2>
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
							<div className="grid grid-cols-2 gap-3 pb-6 border-b border-gray-500">
								<h2 className="col-span-2 font-bold">Produk</h2>
								<SelectComponent
									name="idProduct"
									label="Model"
									placeholder="Pilih"
									options={optionsProducts}
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
									name="material"
									label="Kain"
									placeholder="Pilih"
									options={optionsMaterials}
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
							<Collapsible
								open={openCollapse}
								onOpenChange={setOpenCollapse}
								className="h-full"
							>
								<span className="flex justify-between">
									<h2 className="font-bold">Custom</h2>
									<CollapsibleTrigger>
										<Button variant="ghost" type="button">
											{openCollapse ? <ChevronUp /> : <ChevronDown />}
										</Button>
									</CollapsibleTrigger>
								</span>
								<CollapsibleContent>
									<div className="grid grid-cols-2 gap-3 pb-3">
										<SelectComponent
											name="drawer"
											label="Laci"
											placeholder="Pilih"
											options={optionsDrawer}
											control={
												modalProps.type == "add" || editLogo
													? control
													: controlEdit
											}
											errors={
												modalProps.type == "add" || editLogo
													? errors
													: errorsEdit
											}
											schema={
												modalProps.type == "add" || editLogo
													? schemaForm
													: schemaFormEdit
											}
										/>
										<InputComponent
											name="item"
											label="Item"
											type="number "
											control={
												modalProps.type == "add" || editLogo
													? control
													: controlEdit
											}
											schema={
												modalProps.type == "add" || editLogo
													? schemaForm
													: schemaFormEdit
											}
											errors={
												modalProps.type == "add" || editLogo
													? errors
													: errorsEdit
											}
										/>
										<SelectComponent
											name="buttons"
											label="Kancing"
											placeholder="Pilih"
											options={optionsButton}
											control={
												modalProps.type == "add" || editLogo
													? control
													: controlEdit
											}
											errors={
												modalProps.type == "add" || editLogo
													? errors
													: errorsEdit
											}
											schema={
												modalProps.type == "add" || editLogo
													? schemaForm
													: schemaFormEdit
											}
										/>
										<SelectComponent
											name="cover"
											label="Amparan"
											placeholder="Pilih"
											options={optionsCover}
											control={
												modalProps.type == "add" || editLogo
													? control
													: controlEdit
											}
											errors={
												modalProps.type == "add" || editLogo
													? errors
													: errorsEdit
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
						<div className="flex flex-col gap-3 p-6">
							<table>
								<tr>
									<td>
										<h2>Harga Pokok</h2>
									</td>
									<td className="text-right">
										<h2>Rp {productPrice}</h2>
									</td>
								</tr>
								<tr className="border-b border-gray-500">
									<td>
										<h2>Harga Custom</h2>
									</td>
									<td className="text-right">
										<h2>Rp {customPrice}</h2>
									</td>
								</tr>
								<tr className="font-bold">
									<td>
										<h1>Total</h1>
									</td>
									<td className="text-right">
										<h2>Rp {totalPrice}</h2>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default WithAuth(Order);
