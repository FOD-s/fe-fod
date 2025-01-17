import CheckboxCustom from "@/components/molecules/Checkbox";
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
import useModelPriceService from "@/services/model";
import useTrundleBedService from "@/services/trundleBd";
import { ChevronDown, ChevronUp, ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Datepick from "../../components/molecules/Datepick";
import { formatRupiah, parseRupiah } from "@/utils/formatRupiah";
import { useSelector } from "react-redux";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import { useToast } from "@/hooks/use-toast";
import RadioButton from "@/components/molecules/RadioButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const optionsTrundleBed = [
	{ value: true, label: "Sandaran" },
	{ value: false, label: "Non Sandaran" },
];

const MySwal = withReactContent(Swal);

const defaultValues = {
	client: "",
	deliveryAddress: "",
	idProduct: "",
	backrest: true,
	size: "",
	material: "",
	color: "",
	doubleBackrest: false,
	note: "",
};

const schemaForm = yup.object().shape({
	client: yup.string().required("Konsumen harus diisi"),
	deliveryAddress: yup.string().required("Alamat harus diisi"),
	idProduct: yup.string().required("Produk harus dipilih"),
	backrest: yup.boolean(),
	size: yup.string().required("Ukuran harus diisi"),
	material: yup.string().required("Kain harus dipilih"),
	color: yup.string().required("Warna harus diisi"),
	doubleBackrest: yup.boolean(),
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
	const { getAllOrder, createOrder, approveOrder, reviewOrder } =
		useOrderService();
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
		getDropdownTrundleBedSize,
	} = useSelectService();
	const { getModelPrice } = useModelPriceService();
	const { getTrundleBedPrice } = useTrundleBedService();
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
		resetField,
		watch,
		setValue,
	} = useForm({
		resolver: yupResolver(schemaForm),
		defaultValues: defaultValues,
	});

	const idProduct = watch("idProduct");
	const size = watch("size");
	const backrest = watch("backrest");

	const doubleBackrest = watch("doubleBackrest");
	useEffect(() => {
		console.log(doubleBackrest);
	}, [doubleBackrest]);

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
				statusAksi={user.roleId==1?"validation":"editAndDetail"}
				handleApprove={handleApprove}
				handleReview={handleReview}
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

	const sendApproveData = async (id, finalPrice) => {
		const validator = user.name;
		try {
			const res = await approveOrder(id, {
				validator,
				finalPrice: parseRupiah(finalPrice),
			});
			if (res?.status !== 200) {
				return toast({
					variant: "destructive",
					title: "Error",
					description: res?.data.message,
				});
			}

			getListOrder();
			return res;
		} catch (error) {
			return error;
		}
	};

	const handleApprove = (data) => {
		const { id, sumPrice } = data;
		MySwal.fire({
			title: "Perhatian",
			text: "Apakah anda yakin untuk menyetujui order dengan harga tersebut ?",
			confirmButtonText: "Ya",
			showCancelButton: true,
			cancelButtonText: `Batal`,
			icon: "question",
			input: "text",
			inputValue: formatRupiah(String(sumPrice)),
			didOpen: () => {
				const input = Swal.getInput();
				input.addEventListener("input", (e) => {
					const formattedValue = formatRupiah(e.target.value); // Format ke Rupiah
					input.value = formattedValue; // Set nilai input yang sudah diformat
				});
			},
			preConfirm: async (finalPrice) => {
				try {
					sendApproveData(id, finalPrice);
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
					description: "Order berhasil disetujui",
				});
			}
		});
	};

	const sendDataReview = async (orderId, note) => {
		const validator = user.name;
		try {
			const res = await reviewOrder(orderId, { validator, note });
			if (res?.status !== 200) {
				return toast({
					variant: "destructive",
					title: "Error",
					description: res?.data.message,
				});
			}

			getListOrder();
			return res;
		} catch (error) {
			return error;
		}
	};

	const handleReview = (orderId) => {
		Swal.fire({
			title: "Apakah anda yakin untuk mengembalikan order tersebut ?",
			text: "Berikan keterangan untuk mengembalikan order.",
			confirmButtonText: "Ya",
			showCancelButton: true,
			cancelButtonText: `Batal`,
			icon: "question",
			input: "textarea",
			preConfirm: async (note) => {
				try {
					sendDataReview(orderId, note);
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
					description: "Order berhasil dikembalikan",
				});
			}
		});
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

	const getOptionSize = async (idProduct) => {
		try {
			const res = await getDropdownSize(idProduct);
			setOptionsSizes(res?.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getOptionTrundleSize = async (idProduct, backrest) => {
		try {
			const res = await getDropdownTrundleBedSize(idProduct, backrest);
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
	}, []);

	useEffect(() => {
		if (!pageForm) {
			reset();
			setCustomPrice(0);
			setProductPrice(0);
		}
	}, [pageForm]);

	useEffect(() => {
		setProductPrice(0);
		resetField("size");
		if (idProduct != 5) {
			getOptionSize(idProduct);
		} else {
			getOptionTrundleSize(idProduct, backrest);
		}
	}, [idProduct]);

	useEffect(() => {
		const getPriceProduct = async (idProduct, size, type = "BASIC") => {
			try {
				if (idProduct != 5) {
					const res = await getModelPrice(idProduct, size, type);
					setProductPrice(res?.data.price);
				} else {
					const res = await getTrundleBedPrice(idProduct, size, backrest);
					setProductPrice(res?.data.price);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (idProduct && size) {
			getPriceProduct(idProduct, size);
		}
	}, [size, backrest]);

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
									control={modalProps.type == "add" ? control : controlEdit}
									errors={modalProps.type == "add" ? errors : errorsEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
									}
								/>
								{/* <InputComponent
									name="size"
									label="Ukuran"
									type="text"
									control={
										modalProps.type == "add"  ? control : controlEdit
									}
									schema={
										modalProps.type == "add" 
											? schemaForm
											: schemaFormEdit
									}
									errors={
										modalProps.type == "add"  ? errors : errorsEdit
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
								{idProduct == 5 && (
									<div className="flex items-center col-span-2">
										<RadioButton
											className="grid w-full grid-cols-2"
											options={optionsTrundleBed}
											defaultValue={true}
											control={modalProps.type == "add" ? control : controlEdit}
											name="backrest"
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
									</div>
								)}
								<SelectComponent
									name="material"
									label="Kain"
									placeholder="Pilih"
									options={optionsMaterials}
									control={modalProps.type == "add" ? control : controlEdit}
									errors={modalProps.type == "add" ? errors : errorsEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
									}
								/>
								<InputComponent
									name="color"
									label="Warna"
									type="text"
									control={modalProps.type == "add" ? control : controlEdit}
									schema={
										modalProps.type == "add" ? schemaForm : schemaFormEdit
									}
									errors={modalProps.type == "add" ? errors : errorsEdit}
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
											control={modalProps.type == "add" ? control : controlEdit}
											errors={modalProps.type == "add" ? errors : errorsEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
										<SelectComponent
											name="cover"
											label="Amparan"
											placeholder="Pilih"
											options={optionsCover}
											control={modalProps.type == "add" ? control : controlEdit}
											errors={modalProps.type == "add" ? errors : errorsEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
										<CheckboxCustom
											label="Double Sandaran"
											name="doubleBackrest"
											control={modalProps.type == "add" ? control : controlEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
										<CheckboxCustom
											label="Busa"
											name="foam"
											control={modalProps.type == "add" ? control : controlEdit}
											schema={
												modalProps.type == "add" ? schemaForm : schemaFormEdit
											}
										/>
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
						<div className="flex flex-col p-6">
							<table>
								<tr>
									<td>
										<h2>Harga Pokok</h2>
									</td>
									<td className="text-right">
										<h2>{productPrice ? formatRupiah(productPrice) : "0"}</h2>
									</td>
								</tr>
								<tr>
									<td>
										<h2>Harga Custom</h2>
									</td>
									<td className="text-right">
										<h2>{customPrice ? formatRupiah(customPrice) : "0"}</h2>
									</td>
								</tr>
								<tr className="mt-3 border-b border-gray-500">
									<td></td>
									<td></td>
								</tr>
								<tr className="font-bold">
									<td>
										<h1>Total</h1>
									</td>
									<td className="text-right">
										<h2>{totalPrice ? formatRupiah(totalPrice) : "0"}</h2>
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
