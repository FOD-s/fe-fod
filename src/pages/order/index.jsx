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
import useModelPriceService from "../../services/model";
import { ChevronDown, ChevronUp, ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Datepick from "../../components/molecules/Datepick";
import { formatRupiah } from "@/utils/formatRupiah";
import { useSelector } from "react-redux";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import { useToast } from "@/hooks/use-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
	client: "",
	deliveryAddress: "",
	idProduct: "",
	size: "",
	material: "",
	color: "",
	note: "",
};

const schemaForm = yup.object().shape({
	client: yup.string().required("Konsumen harus diisi"),
	deliveryAddress: yup.string().required("Alamat harus diisi"),
	idProduct: yup.string().required("Produk harus dipilih"),
	size: yup.string().required("Ukuran harus diisi"),
	material: yup.string().required("Kain harus dipilih"),
	color: yup.string().required("Warna harus diisi"),
	note: yup.string().nullable(),
});

const schemaFormEdit = yup.object().shape({
	client: yup.string().required("Konsumen harus diisi"),
	deliveryAddress: yup.string().required("Alamat harus diisi"),
	idProduct: yup.string().required("Produk harus dipilih"),
	size: yup.string().required("Ukuran harus diisi"),
	material: yup.string().required("Kain harus dipilih"),
	color: yup.string().required("Warna harus diisi"),
	note: yup.string().nullable(),
});

function Order() {
	const { getAllOrder, createOrder } = useOrderService();
	const [deliveryDate, setDeliveryDate] = useState(new Date());
	const [openCollapse, setOpenCollapse] = useState(false);
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
		getDropdownSize,
	} = useSelectService();
	const { getModelPrice } = useModelPriceService();
	const [pageForm, setPageForm] = useState(false);
	const user = useSelector(DATA_USER);
	const { toast } = useToast();

	let [listData, setListData] = useState([]);
	let [optionsProducts, setOptionsProducts] = useState([]);
	let [optionsMaterials, setOptionsMaterials] = useState([]);
	let [optionsDrawer, setOptionsDrawers] = useState([]);
	let [optionsButton, setOptionsButtons] = useState([]);
	let [optionsCover, setOptionsCovers] = useState([]);
	let [optionsSize, setOptionsSizes] = useState([]);
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

	const idProduct = watch("idProduct");
	const size = watch("size");

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
		setModalProps({
			// title: "Add Order",
			type: "add",
		});
		setPageForm(true);
	};

	const submitForm = (data) => {
		data.userId = user.id;
		data.deliveryDate = deliveryDate;
		data.type = "BASIC";
		data.sumPrice = parseInt(productPrice) + parseInt(customPrice);
		data.finalPrice = parseInt(productPrice) + parseInt(customPrice);
		sendDataOrder(data);
	};

	const sendDataOrder = async (data) => {
		try {
			const res = await createOrder(data);
			if (res?.status !== 200) {
				return toast({
					variant: "destructive",
					description: res.data.message,
				});
			}
			toast({
				description: res.data.message,
			});
			setPageForm(false);
			getListOrder();
		} catch (error) {
			console.log(error);
		}
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

	const getOptionSize = async () => {
		try {
			const res = await getDropdownSize();
			setOptionsSizes(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeDeliveryDate = (date) => {
		const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
		setDeliveryDate(formattedDate);
	};

	useEffect(() => {
		getListOrder();
		getOptionProduct();
		getOptionMaterial();
		getOptionDrawer();
		getOptionButton();
		getOptionCover();
		getOptionSize();
	}, []);

	useEffect(() => {
		if (!pageForm) {
			reset();
			setCustomPrice(0);
			setProductPrice(0);
		}
	}, [pageForm]);

	useEffect(() => {
		const getPriceProduct = async (idProduct, size, type = "BASIC") => {
			try {
				const res = await getModelPrice(idProduct, size, type);
				setProductPrice(res?.data.price);
			} catch (error) {
				console.log(error);
			}
		};
		if (idProduct && size) {
			getPriceProduct(idProduct, size);
		}
	}, [idProduct, size]);

	useEffect(() => {
		setTotalPrice(parseInt(productPrice) + parseInt(customPrice));
	}, [customPrice, productPrice]);

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
						<h1>Buat Order</h1>
						<Button variant="ghost" onClick={() => setPageForm(false)}>
							<ChevronsLeft /> Kembali
						</Button>
					</div>
					<div className="grid grid-cols-3 p-4 rounded-md shadow-neumorphism">
						<form
							onSubmit={
								modalProps.type == "add"
									? handleSubmit(submitForm)
									: handleSubmitEdit(submitForm)
							}
							className="flex flex-col w-full h-full col-span-2 gap-3 px-6 pb-6"
						>
							<div className="flex flex-col w-full gap-2 pb-3 border-b border-gray-500">
								<h2 className="font-bold">Konsumen</h2>
								<InputComponent
									name="client"
									label="Nama"
									type="text"
									control={modalProps.type == "add" ? control : controlEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
									}
									errors={modalProps.type == "add" ? errors : errorsEdit}
								/>
								<InputComponent
									name="deliveryAddress"
									label="Alamat"
									type="text"
									control={modalProps.type == "add" ? control : controlEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
									}
									errors={modalProps.type == "add" ? errors : errorsEdit}
								/>
								<Datepick
									label={"Tanggal Pengiriman"}
									date={deliveryDate}
									onChange={handleChangeDeliveryDate}
								/>
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
								{/* <InputComponent
									name="size"
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
								/> */}
								<SelectComponent
									name="size"
									label="Ukuran"
									placeholder="Pilih"
									options={optionsSize}
									control={modalProps.type == "add" ? control : controlEdit}
									errors={modalProps.type == "add" ? errors : errorsEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
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
									name="color"
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
											control={modalProps.type == "add" ? control : controlEdit}
											errors={modalProps.type == "add" ? errors : errorsEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
										<InputComponent
											name="item"
											label="Item"
											type="number "
											control={modalProps.type == "add" ? control : controlEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
											errors={modalProps.type == "add" ? errors : errorsEdit}
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
							<InputComponent
								name="note"
								label="Note"
								type="text"
								control={modalProps.type == "add" ? control : controlEdit}
								schema={modalProps.type == "add" ? schemaForm : schemaFormEdit}
								errors={modalProps.type == "add" ? errors : errorsEdit}
							/>
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
										<h2>{formatRupiah(productPrice)}</h2>
									</td>
								</tr>
								<tr className="border-b border-gray-500">
									<td>
										<h2>Harga Custom</h2>
									</td>
									<td className="text-right">
										<h2>{formatRupiah(customPrice)}</h2>
									</td>
								</tr>
								<tr className="font-bold">
									<td>
										<h1>Total</h1>
									</td>
									<td className="text-right">
										<h2>{formatRupiah(totalPrice)}</h2>
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
