import CheckboxCustom from "@/components/molecules/Checkbox";
import InputComponent from "@/components/molecules/Input";
import InputDynamic from "@/components/molecules/InputDynamic";
import RadioButton from "@/components/molecules/RadioButton";
import SelectComponent from "@/components/molecules/SelectCustom";
import TablePrice from "@/components/molecules/TablePrice";
import DataTablePagination from "@/components/organisms/DataTablePagination";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DATA_USER } from "@/features/auth/loginSlice.js";
import {
  PAGINATION,
  SEARCH,
  updateLimit,
  updatePage,
  updateTotalItem,
} from "@/features/pagination/paginationSlice";
import WithAuth from "@/hoc/WithAuth";
import { useToast } from "@/hooks/use-toast";
import useBackrestPriceService from "@/services/backrest";
import useButtonService from "@/services/buttons";
import useCoverPriceService from "@/services/cover";
import useDrawerPriceService from "@/services/drawer";
import useFoamPriceService from "@/services/foam";
import useMaterialPriceService from "@/services/material";
import useModelPriceService from "@/services/model";
import useOrderService from "@/services/order";
import useSelectService from "@/services/select";
import {
  OPTIONS_DRAWER_POSITION,
  OPTIONS_TRUNDLE_BED,
  OPTIONS_TYPE_BED,
} from "@/utils/constant.js";
import {
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  FileCheck2Icon,
  FileOutputIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Datepick from "../../components/molecules/Datepick";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const MySwal = withReactContent(Swal);

const defaultEtcCustom = [{ keterangan: "", nominal: "" }];

const defaultValues = {
  id: "",
  userId: "",
  client: "",
  deliveryAddress: "",
  idProduct: "",
  size: "",
  material: "",
  cover: "",
  button: "",
  extra: null,
  drawer: "",
  drawerTotal: 0,
  drawerPosition: "",
  foam: null,
  color: "",
  doubleBackrest: null,
  type: "",
  note: "",
  status: "",
};

const schemaForm = yup.object().shape({
  client: yup.string().required("Konsumen harus diisi"),
  deliveryAddress: yup.string().required("Alamat harus diisi"),
  idProduct: yup.string().required("Produk harus dipilih"),
  size: yup.string().required("Ukuran harus diisi"),
  color: yup.string().required("Warna harus diisi"),
  note: yup.string().nullable(),
});

// const schemaFormEdit = yup.object().shape({
// 	client: yup.string().required("Konsumen harus diisi"),
// 	deliveryAddress: yup.string().required("Alamat harus diisi"),
// 	idProduct: yup.string().required("Produk harus dipilih"),
// 	size: yup.string().required("Ukuran harus diisi"),
// 	material: yup.string().required("Kain harus dipilih"),
// 	color: yup.string().required("Warna harus diisi"),
// 	note: yup.string().nullable(),
// });

function Order() {
  const {
    getAllOrder,
    createOrder,
    approveOrder,
    reviewOrder,
    getOrderById,
    updateOrder,
  } = useOrderService();
  const {
    getDropdownProduct,
    getDropdownMaterial,
    getDropdownDrawer,
    getDropdownButton,
    getDropdownCover,
    getDropdownSize,
  } = useSelectService();
  const { getMaterialPrice } = useMaterialPriceService();
  const { getModelPrice } = useModelPriceService();
  const { getCoverPrice } = useCoverPriceService();
  const { getButtonPrice } = useButtonService();
  const { getDrawerPrice } = useDrawerPriceService();
  const { getBackrestPrice } = useBackrestPriceService();
  const { getFoamPrice } = useFoamPriceService();

  const dispatch = useDispatch();
  const paging = useSelector(PAGINATION);
  const searchValue = useSelector(SEARCH);
  const user = useSelector(DATA_USER);
  const [modalProps, setModalProps] = useState({
    title: "Add Order",
    type: "add",
  });
  const [pageForm, setPageForm] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const { toast } = useToast();

  // options state
  let [optionsProducts, setOptionsProducts] = useState([]);
  let [optionsMaterials, setOptionsMaterials] = useState([]);
  let [optionsDrawer, setOptionsDrawers] = useState([]);
  let [optionsButton, setOptionsButtons] = useState([]);
  let [optionsCover, setOptionsCovers] = useState([]);
  let [optionsSize, setOptionsSizes] = useState([]);

  // main state
  let [listData, setListData] = useState([]);
  let [deliveryDate, setDeliveryDate] = useState(new Date());
  let [productPrice, setProductPrice] = useState(0);
  let [materialPrice, setMaterialPrice] = useState(0);
  let [coverPrice, setCoverPrice] = useState(0);
  let [buttonPrice, setButtonPrice] = useState(0);
  let [drawerPrice, setDrawerPrice] = useState(0);
  let [doubleBackrestPrice, setDoubleBackrestPrice] = useState(0);
  let [foamPrice, setFoamPrice] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  let [etcCustom, setEtcCustom] = useState(defaultEtcCustom);
  let [etcPrice, setEtcPrice] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

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

  // subscribe form value
  const orderId = watch("id");
  const status = watch("status");
  const idProduct = watch("idProduct");
  const material = watch("material");
  const cover = watch("cover");
  const size = watch("size");
  const type = watch("type");
  const button = watch("button");
  const extra = watch("extra");
  const drawer = watch("drawer");
  const drawerTotal = watch("drawerTotal");
  const doubleBackrest = watch("doubleBackrest");
  const foam = watch("foam");

  const handleAddInput = () => {
    setEtcCustom((prevEtcCustom) => [...prevEtcCustom, ""]);
  };

  const handleRemoveInput = (index) => {
    setEtcCustom((prevEtcCustom) =>
      prevEtcCustom.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (index, field, value) => {
    setEtcCustom((prevEtcCustom) =>
      prevEtcCustom.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const getCustomPriceBackrest = async (material) => {
    try {
      const res = await getBackrestPrice(material);

      setDoubleBackrestPrice(res?.data.price);
    } catch (error) {
      console.error(error);
    }
  };

  const getListOrder = async () => {
    try {
      const res = await getAllOrder();
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
        handleAdd={handleAdd}
        // handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleDetail={handleDetail}
        statusAksi={user.roleId == 1 ? "detailOnly" : "editAndDetail"}
        handleApprove={handleApprove}
        handleReview={handleReview}
      />
    );
  };

  const setFormEdit = (data) => {
    setValue("id", data.id);
    setValue("status", data.status);
    setValue("userId", data.userId);
    setValue("client", data.client);
    setValue("deliveryAddress", data.deliveryAddress);
    setValue("idProduct", data.idProduct);
    setValue("type", data.type);
    setValue("size", data.size);
    setValue("color", data.color);
    setValue("material", data.material);
    setValue("cover", data.cover);
    setValue("button", data.button);
    setValue("extra", data.extra);
    setValue("drawer", data.drawer);
    setValue("drawerTotal", data.drawerTotal);
    setValue("drawerPosition", data.drawerPosition);
    setValue("foam", data.foam);
    setValue("doubleBackrest", data.doubleBackrest);
    setValue("note", data.note);

    setDeliveryDate(new Date(data.deliveryDate));
    setProductPrice(data.productPrice);
    setMaterialPrice(data.materialPrice);
    setCoverPrice(data.coverPrice);
    setButtonPrice(data.buttonPrice);
    setDrawerPrice(data.drawerPrice);
    setDoubleBackrestPrice(data.doubleBackrestPrice);
    setFoamPrice(data.foamPrice);
    setTotalPrice(data.sumPrice);
    setEtcCustom(data?.etcCustom ? data?.etcCustom : defaultEtcCustom);
    setEtcPrice(data?.etcPrice);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const getDetailOrder = async (id) => {
    setIsLoading(true);
    try {
      const res = await getOrderById(id);

      return setFormEdit(res?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setModalProps({
      title: "Edit Order",
      type: "edit",
    });
    setPageForm(true);
    getDetailOrder(id);
  };

  const handleDetail = (id) => {
    setModalProps({
      title: "Detail Order",
      type: "detail",
    });
    setPageForm(true);
    getDetailOrder(id);
  };

  const handleAdd = () => {
    // setIsDialogOpen(true);
    setModalProps({
      title: "Buat Order",
      type: "add",
    });
    setPageForm(true);
  };

  const sendApproveData = async (id, etcCustom, etcPrice) => {
    const validator = user.name;
    try {
      const res = await approveOrder(id, {
        validator,
        etcCustom,
        etcPrice,
      });
      if (res?.status !== 200) {
        return toast({
          variant: "destructive",
          title: "Error",
          description: res?.data.message,
        });
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const handleApprove = () => {
    // const { id, sumPrice } = data;
    MySwal.fire({
      title: "Perhatian",
      text: "Apakah anda yakin untuk menyetujui order tersebut ?",
      confirmButtonText: "Ya",
      showCancelButton: true,
      cancelButtonText: `Batal`,
      icon: "question",
      // input: "text",
      // inputValue: formatRupiah(String(totalPrice + etcPrice)),
      // didOpen: () => {
      // 	const input = Swal.getInput();
      // 	input.addEventListener("input", (e) => {
      // 		const formattedValue = formatRupiah(e.target.value); // Format ke Rupiah
      // 		input.value = formattedValue; // Set nilai input yang sudah diformat
      // 	});
      // },
      preConfirm: async () => {
        try {
          sendApproveData(orderId, etcCustom, etcPrice);
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
        getListOrder();
        setPageForm(false);
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

  const handleReview = () => {
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
        getListOrder();
        setPageForm(false);
      }
    });
  };

  const submitForm = (data) => {
    let dataPrice = {
      productPrice,
      materialPrice,
      coverPrice,
      buttonPrice,
      drawerPrice,
      doubleBackrestPrice,
      foamPrice,
    };

    data = { dataPrice, ...data };
    data.userId = user.id;
    data.deliveryDate = deliveryDate;
    data.sumPrice = parseInt(totalPrice);
    data.finalPrice = parseInt(totalPrice);
    data.material ? (data.material = data.material) : delete data.material;

    sendDataOrder(data);
  };

  const submitFormEdit = (data) => {
    let dataPrice = {
      productPrice,
      materialPrice,
      coverPrice,
      buttonPrice,
      drawerPrice,
      doubleBackrestPrice,
      foamPrice,
    };

    data = { dataPrice, ...data };
    data.deliveryDate = deliveryDate;
    data.sumPrice = parseInt(totalPrice);
    data.finalPrice = parseInt(totalPrice);
    data.material ? (data.material = data.material) : delete data.material;

    sendDataOrder(data);
  };

  const sendDataOrder = async (data) => {
    try {
      let res;
      modalProps.type == "add"
        ? (res = await createOrder(data))
        : (res = await updateOrder(data.id, data));

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

  const getOptionSize = async (idProduct, type) => {
    try {
      if (idProduct) {
        const res = await getDropdownSize(idProduct, type);
        setOptionsSizes(res?.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDeliveryDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    setDeliveryDate(formattedDate);
  };

  const getCustomPriceMaterial = async (idProduct, type, material) => {
    try {
      if (idProduct <= 5) {
        const res = await getMaterialPrice(idProduct, type, material);
        setMaterialPrice(res?.data.price);
      } else {
        const res = await getMaterialPrice(idProduct, "", material);
        setMaterialPrice(res?.data.price);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomPriceCover = async () => {
    try {
      const res = await getCoverPrice(size, cover);
      setCoverPrice(res?.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomPriceButton = async (button, extra) => {
    try {
      const res = await getButtonPrice(button, extra);
      setButtonPrice(res?.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomPriceFoam = async (idProduct, type) => {
    try {
      if (idProduct < 5) {
        const res = await getFoamPrice(idProduct, type);
        setFoamPrice(res?.data.price);
      } else {
        const res = await getFoamPrice(idProduct, "");
        setFoamPrice(res?.data.price);
      }
    } catch (error) {}
  };

  const getCustomPriceDrawer = async (drawer) => {
    try {
      const res = await getDrawerPrice(drawer);
      if (drawerTotal <= 1) {
        return setDrawerPrice(res?.data.price);
      }
      return setDrawerPrice(res?.data.price * drawerTotal);
    } catch (error) {
      console.error(error);
    }
  };

  const getPriceProduct = async (idProduct, size, type) => {
    try {
      const res = await getModelPrice(idProduct, size, type);
      setProductPrice(res?.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const sumArray = (numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
  };

  useEffect(() => {
    getListOrder();
    getOptionProduct();
    getOptionMaterial();
    getOptionDrawer();
    getOptionButton();
    getOptionCover();
    getOptionSize("0");
    dispatch(updateLimit(10));
    dispatch(updatePage(1));
  }, []);

  useEffect(() => {
    if (!pageForm) {
      reset();
      setEtcCustom(defaultEtcCustom);
      setDeliveryDate(new Date());
      setOpenCollapse(false);

      setProductPrice(0);
      setMaterialPrice(0);
      setCoverPrice(0);
      setButtonPrice(0);
      setFoamPrice(0);
      setDrawerPrice(0);
      setDoubleBackrestPrice(0);
      setEtcPrice(0);
      setTotalPrice(0);
    }
  }, [pageForm]);

  useEffect(() => {
    if (isLoading) return;
    if (idProduct) {
      // if (idProduct == 5 && type == "") {
      //   setValue("type", "SANDARAN");
      // } else {
      //   setValue("type", "BASIC");
      // }
      getOptionSize(idProduct, type);
    }

    if (material) {
      if (material && idProduct && type) {
        getCustomPriceMaterial(idProduct, type, material);
      }
    }

    if (foam) {
      getCustomPriceFoam(idProduct, type);
    }
  }, [idProduct]);

  useEffect(() => {
    if (isLoading) return;

    if (material && idProduct && type) {
      getCustomPriceMaterial(idProduct, type, material);
    }
    if (doubleBackrest) {
      getCustomPriceBackrest(material);
    }
  }, [material]);

  useEffect(() => {
    if (isLoading) return;

    if (size && cover) {
      getCustomPriceCover(size, cover);
    }
  }, [cover]);

  useEffect(() => {
    if (isLoading) return;

    if (type) {
      getOptionSize(idProduct, type);
    }
    if (material) {
      getCustomPriceMaterial(idProduct, type, material);
    }
  }, [type]);

  useEffect(() => {
    if (isLoading) return;

    if (idProduct && size) {
      getPriceProduct(idProduct, size, type);
    }

    if (size && cover) {
      getCustomPriceCover(size, cover);
    }
  }, [size]);

  useEffect(() => {
    if (isLoading) return;

    if (button) {
      if (extra) {
        getCustomPriceButton(button, 1);
      } else {
        getCustomPriceButton(button, 0);
      }
    }
  }, [button, extra]);

  useEffect(() => {
    if (isLoading) return;

    if (drawer) {
      getCustomPriceDrawer(drawer);
      if (drawerTotal < 1) {
        setValue("drawerTotal", 1);
      }
    }
  }, [drawer]);

  useEffect(() => {
    if (isLoading) return;

    if (drawerTotal >= 1) {
      getCustomPriceDrawer(drawer);
    } else {
      setDrawerPrice(0);
    }
  }, [drawerTotal]);

  useEffect(() => {
    if (isLoading) return;

    if (doubleBackrest) {
      if (material) {
        getCustomPriceBackrest(material);
      } else {
        getCustomPriceBackrest("Spondoff");
      }
    } else {
      setDoubleBackrestPrice(0);
    }
  }, [doubleBackrest]);

  useEffect(() => {
    if (isLoading) return;

    if (idProduct) {
      if (foam) {
        getCustomPriceFoam(idProduct, type);
      } else {
        setFoamPrice(0);
      }
    }
  }, [foam]);

  useEffect(() => {
    if (isLoading) return;

    const total = [
      parseInt(productPrice),
      parseInt(materialPrice),
      parseInt(coverPrice),
      parseInt(buttonPrice),
      parseInt(drawerPrice),
      parseInt(doubleBackrestPrice),
      parseInt(foamPrice),
    ];
    setTotalPrice(sumArray(total));
  }, [
    productPrice,
    materialPrice,
    coverPrice,
    buttonPrice,
    drawerPrice,
    doubleBackrestPrice,
    foamPrice,
  ]);

  useEffect(() => {
    if (isLoading) return;

    const etcCustomTotal = etcCustom?.some(
      (item) => item.keterangan !== "" && item.nominal !== ""
    )
      ? etcCustom.reduce((total, item) => total + parseInt(item.nominal), 0)
      : 0;

    setEtcPrice(etcCustomTotal);
  }, [etcCustom]);

  useEffect(() => {
    if (isLoading) return;

    if (optionsSize.length >= 1 && idProduct && size) {
      getPriceProduct(idProduct, size, type);
    }
  }, [optionsSize]);

  useEffect(() => {
    getListOrder();
  }, [searchValue, paging]);

  return (
    <>
      {!pageForm ? (
        <div className="space-y-3">
          <h1>Orders</h1>
          {listData && renderDatatable(listData)}
        </div>
      ) : (
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <h1>{modalProps.title}</h1>
            <Button variant="ghost" onClick={() => setPageForm(false)}>
              <ChevronsLeft /> Kembali
            </Button>
          </div>
          <div className="grid grid-cols-3 p-4 rounded-md shadow-neumorphism">
            <form
              onSubmit={
                modalProps.type == "add"
                  ? handleSubmit(submitForm)
                  : handleSubmit(submitFormEdit)
              }
              className="flex flex-col w-full h-full col-span-2 gap-3 px-6 pb-6"
            >
              <div className="flex flex-col w-full gap-2 pb-3 border-b border-gray-500">
                <h2 className="font-bold">Konsumen</h2>
                <InputComponent
                  name="client"
                  label="Nama"
                  type="text"
                  control={control}
                  schema={schemaForm}
                  errors={errors}
                  disabled={modalProps.type == "detail"}
                />
                <InputComponent
                  name="deliveryAddress"
                  label="Alamat"
                  type="text"
                  control={control}
                  schema={schemaForm}
                  errors={errors}
                  disabled={modalProps.type == "detail"}
                />
                <Datepick
                  label={"Tanggal Pengiriman"}
                  date={deliveryDate}
                  onChange={handleChangeDeliveryDate}
                  disabled={modalProps.type == "detail"}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pb-6 border-b border-gray-500">
                <h2 className="col-span-2 font-bold">Produk</h2>
                <SelectComponent
                  name="idProduct"
                  label="Model"
                  placeholder="Pilih"
                  options={optionsProducts}
                  control={control}
                  errors={errors}
                  schema={schemaForm}
                  disabled={modalProps.type == "detail"}
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
                {idProduct == 5 ? (
                  <RadioButton
                    className="grid items-center w-full grid-cols-2"
                    options={OPTIONS_TRUNDLE_BED}
                    control={control}
                    name="type"
                    schema={schemaForm}
                    disabled={modalProps.type == "detail"}
                    label="Tipe"
                    defaultValues={OPTIONS_TRUNDLE_BED[0].value}
                  />
                ) : (
                  <RadioButton
                    className="grid items-center w-full grid-cols-2"
                    options={OPTIONS_TYPE_BED}
                    control={control}
                    name="type"
                    schema={schemaForm}
                    disabled={modalProps.type == "detail"}
                    label="Tipe"
                    defaultValues={OPTIONS_TYPE_BED[0].value}
                  />
                )}
                <SelectComponent
                  name="size"
                  label="Ukuran"
                  placeholder="Pilih"
                  options={optionsSize}
                  control={control}
                  errors={errors}
                  schema={schemaForm}
                  disabled={modalProps.type == "detail"}
                />
                <InputComponent
                  name="color"
                  label="Warna"
                  type="text"
                  control={control}
                  schema={schemaForm}
                  errors={errors}
                  disabled={modalProps.type == "detail"}
                />
              </div>
              <Collapsible
                open={openCollapse}
                onOpenChange={setOpenCollapse}
                className="h-full"
              >
                <CollapsibleTrigger className="w-full">
                  <span className="flex justify-between">
                    <h2 className="font-bold">Custom</h2>
                    <Button variant="ghost" type="button">
                      {openCollapse ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid items-center grid-cols-2 gap-3 pb-6 border-b border-gray-500">
                    <SelectComponent
                      name="material"
                      label="Kain"
                      placeholder="Pilih"
                      options={optionsMaterials}
                      control={control}
                      errors={errors}
                      schema={schemaForm}
                      disabled={modalProps.type == "detail"}
                    />
                    <SelectComponent
                      name="cover"
                      label="Amparan"
                      placeholder="Pilih"
                      options={optionsCover}
                      control={control}
                      errors={errors}
                      schema={schemaForm}
                      disabled={modalProps.type == "detail"}
                    />
                    <div className="grid items-center grid-cols-2 col-span-2 gap-3">
                      <SelectComponent
                        name="button"
                        label="Kancing"
                        placeholder="Pilih"
                        options={optionsButton}
                        control={control}
                        errors={errors}
                        schema={schemaForm}
                        disabled={modalProps.type == "detail"}
                      />
                      <CheckboxCustom
                        label="Tambah Kancing"
                        name="extra"
                        control={control}
                        schema={schemaForm}
                        disabled={modalProps.type == "detail"}
                      />
                    </div>
                    <div className="grid grid-cols-3 col-span-2 gap-3">
                      <SelectComponent
                        name="drawer"
                        label="Tipe Laci"
                        placeholder="Pilih"
                        options={optionsDrawer}
                        control={control}
                        errors={errors}
                        schema={schemaForm}
                        disabled={modalProps.type == "detail"}
                      />
                      <InputComponent
                        name="drawerTotal"
                        label="Jumlah Laci"
                        type="number"
                        control={control}
                        schema={schemaForm}
                        errors={errors}
                        disabled={modalProps.type == "detail"}
                      />
                      <SelectComponent
                        name="drawerPosition"
                        label="Posisi Laci"
                        placeholder="Pilih"
                        options={OPTIONS_DRAWER_POSITION}
                        control={control}
                        errors={errors}
                        schema={schemaForm}
                        disabled={modalProps.type == "detail"}
                      />
                    </div>
                    <CheckboxCustom
                      label="Double Sandaran"
                      name="doubleBackrest"
                      control={control}
                      schema={schemaForm}
                      disabled={modalProps.type == "detail"}
                    />
                    <CheckboxCustom
                      label="Busa"
                      name="foam"
                      control={control}
                      schema={schemaForm}
                      disabled={modalProps.type == "detail"}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <InputComponent
                name="note"
                label="Note"
                type="text"
                control={control}
                schema={schemaForm}
                errors={errors}
                disabled={modalProps.type == "detail"}
              />
              {user.roleId == 1 && (
                <div>
                  <InputDynamic
                    etcCustom={etcCustom}
                    disabled={status == "APPROVED"}
                    errors={errors}
                    handleAddInput={handleAddInput}
                    handleRemoveInput={handleRemoveInput}
                    handleInputChange={handleInputChange}
                  />
                </div>
              )}
              {user.roleId == 1 ? (
                <div className="grid grid-cols-1 gap-3 pt-6 mt-3 border-t border-gray-500 lg:grid-cols-2 lg:col-span-2 items-self-end">
                  <Button
                    className="bg-blue-500"
                    type="button"
                    onClick={() => handleApprove()}
                    disabled={status == "APPROVED"}
                  >
                    <FileCheck2Icon /> Approve
                  </Button>
                  <Button
                    className="bg-orange-500"
                    type="button"
                    onClick={() => handleReview()}
                    disabled={status == "APPROVED"}
                  >
                    <FileOutputIcon /> Review
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 pt-6 mt-3 border-t border-gray-500 lg:grid-cols-2 lg:col-span-2 items-self-end">
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
              )}
            </form>
            <div className="flex flex-col p-6">
              <TablePrice
                productPrice={productPrice}
                materialPrice={materialPrice}
                coverPrice={coverPrice}
                buttonPrice={buttonPrice}
                drawerPrice={drawerPrice}
                doubleBackrestPrice={doubleBackrestPrice}
                foamPrice={foamPrice}
                etcCustom={etcCustom}
                totalPrice={totalPrice}
                etcPrice={etcPrice}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WithAuth(Order);
