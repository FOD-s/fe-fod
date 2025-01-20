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
import useMaterialPriceService from "@/services/material";
import useCoverPriceService from "@/services/cover";
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
import {
  OPTIONS_TRUNDLE_BED,
  OPTIONS_TYPE_BED,
  OPTIONS_DRAWER_POSITION,
} from "@/utils/constant.js";
import TablePrice from "@/components/molecules/TablePrice";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const MySwal = withReactContent(Swal);

const defaultValues = {
  client: "",
  deliveryAddress: "",
  idProduct: "",
  backrest: true,
  size: "",
  material: "",
  cover: "",
  color: "",
  doubleBackrest: false,
  type: "BASIC",
  note: "",
};

const schemaForm = yup.object().shape({
  client: yup.string().required("Konsumen harus diisi"),
  deliveryAddress: yup.string().required("Alamat harus diisi"),
  idProduct: yup.string().required("Produk harus dipilih"),
  size: yup.string().required("Ukuran harus diisi"),
  // material: yup.string().required("Kain harus dipilih"),
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
  const {
    getAllOrder,
    getListOrderByUserId,
    createOrder,
    approveOrder,
    reviewOrder,
    getOrderById,
  } = useOrderService();
  const {
    getDropdownProduct,
    getDropdownMaterial,
    getDropdownDrawer,
    getDropdownButton,
    getDropdownCover,
    getDropdownSize,
    getDropdownTrundleBedSize,
  } = useSelectService();
  const { getMaterialPrice } = useMaterialPriceService();
  const { getModelPrice } = useModelPriceService();
  const { getCoverPrice } = useCoverPriceService();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "Add Order",
    type: "add",
  });
  const { getTrundleBedPrice } = useTrundleBedService();
  const [pageForm, setPageForm] = useState(false);
  const user = useSelector(DATA_USER);
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

  // subscribe form value
  const idProduct = watch("idProduct");
  const material = watch("material");
  const cover = watch("cover");
  const size = watch("size");
  const backrest = watch("backrest");
  const type = watch("type");
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
      if (user.roleId == 1) {
        const res = await getAllOrder();
        setListData(res?.data.data);
      } else {
        const res = await getListOrderByUserId(user.id);
        setListData(res?.data.data);
      }
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
        handleDetail={handleDetail}
        statusAksi={user.roleId == 1 ? "validation" : "editAndDetail"}
        handleApprove={handleApprove}
        handleReview={handleReview}
      />
    );
  };

  const setFormEdit = (data) => {
    setValueEdit("client", data.client);
    setValueEdit("deliveryAddress", data.deliveryAddress);
    setValueEdit("idProduct", data.idProduct);
    setValueEdit("backrest", data.backrest);
    setValueEdit("doubleBackrest", data.doubleBackrest);
    setValueEdit("size", data.size);
    setValueEdit("material", data.material);
    setValueEdit("color", data.color);
    setValueEdit("note", data.note);
    setDeliveryDate(new Date(data.deliveryDate));
  };

  const getDetailOrder = async (id) => {
    try {
      const res = await getOrderById(id);

      return setFormEdit(res?.data.data);
    } catch (error) {
      console.log(error);
    }
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
    data.idProduct == 5 ? delete data.type : delete data.backrest;
    data.sumPrice = parseInt(productPrice) + parseInt(customPrice);
    data.finalPrice = parseInt(productPrice) + parseInt(customPrice);
    data.material ? (data.material = data.material) : delete data.material;
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

  const getCustomPriceMaterial = async () => {
    try {
      const res = await getMaterialPrice(idProduct, type, material);
      setMaterialPrice(res?.data.price);
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
      setProductPrice(0);
      setMaterialPrice(0);
    }
  }, [pageForm]);

  useEffect(() => {
    setProductPrice(0);
    setMaterialPrice(0);

    resetField("material");
    resetField("size");
    if (idProduct != 5) {
      getOptionSize(idProduct, type);
      setValue("type", "BASIC");
    } else {
      getOptionTrundleSize(idProduct, backrest);
      setValue("backrest", true);
    }
  }, [idProduct]);

  useEffect(() => {
    if (material && idProduct && type) {
      getCustomPriceMaterial(idProduct, type, material);
    }
  }, [material]);

  useEffect(() => {
    if (size && cover) {
      getCustomPriceCover(size, cover);
    }
  }, [cover]);

  useEffect(() => {
    setProductPrice(0);
    resetField("size");
    getOptionSize(idProduct, type);
    if (material) {
      getCustomPriceMaterial(idProduct, type, material);
    }
  }, [type]);

  useEffect(() => {
    const getPriceProduct = async (idProduct, size, type, backrest) => {
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
      getPriceProduct(idProduct, size, type, backrest);
    }

    if (size && cover) {
      getCustomPriceCover(size, cover);
    }
  }, [size, backrest]);

  // useEffect(() => {
  //   setTotalPrice(parseInt(productPrice) + parseInt(customPrice));
  // }, [customPrice, productPrice]);

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
                  disabled={modalProps.type == "detail"}
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
                  control={modalProps.type == "add" ? control : controlEdit}
                  errors={modalProps.type == "add" ? errors : errorsEdit}
                  schema={
                    modalProps.type == "add" ? schemaForm : schemaFormEdit
                  }
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
                    className="grid w-full grid-cols-2 items-center"
                    options={OPTIONS_TRUNDLE_BED}
                    control={modalProps.type == "add" ? control : controlEdit}
                    name="backrest"
                    schema={
                      modalProps.type == "add" ? schemaForm : schemaFormEdit
                    }
                    disabled={modalProps.type == "detail"}
                    label="Tipe"
                    defaultValues={OPTIONS_TRUNDLE_BED[0].value}
                  />
                ) : (
                  <RadioButton
                    className="grid w-full grid-cols-2 items-center"
                    options={OPTIONS_TYPE_BED}
                    control={modalProps.type == "add" ? control : controlEdit}
                    name="type"
                    schema={
                      modalProps.type == "add" ? schemaForm : schemaFormEdit
                    }
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
                  control={modalProps.type == "add" ? control : controlEdit}
                  errors={modalProps.type == "add" ? errors : errorsEdit}
                  schema={
                    modalProps.type == "add" ? schemaForm : schemaFormEdit
                  }
                  disabled={modalProps.type == "detail"}
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
                  <div className="grid grid-cols-2 gap-3 pb-3 items-center">
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
                      disabled={modalProps.type == "detail"}
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
                      disabled={modalProps.type == "detail"}
                    />
                    <div className="grid grid-cols-2 col-span-2 gap-3 items-center">
                      <SelectComponent
                        name="buttons"
                        label="Kancing"
                        placeholder="Pilih"
                        options={optionsButton}
                        control={
                          modalProps.type == "add" ? control : controlEdit
                        }
                        errors={modalProps.type == "add" ? errors : errorsEdit}
                        schema={
                          modalProps.type == "add" ? schemaForm : schemaFormEdit
                        }
                        disabled={modalProps.type == "detail"}
                      />
                      <CheckboxCustom
                        label="Tambah Kancing"
                        name="addButton"
                        control={
                          modalProps.type == "add" ? control : controlEdit
                        }
                        schema={
                          modalProps.type == "add" ? schemaForm : schemaFormEdit
                        }
                        disabled={modalProps.type == "detail"}
                      />
                    </div>
                    <div className="grid grid-cols-3 col-span-2 gap-3">
                      <SelectComponent
                        name="drawer"
                        label="Tipe Laci"
                        placeholder="Pilih"
                        options={optionsDrawer}
                        control={
                          modalProps.type == "add" ? control : controlEdit
                        }
                        errors={modalProps.type == "add" ? errors : errorsEdit}
                        schema={
                          modalProps.type == "add" ? schemaForm : schemaFormEdit
                        }
                        disabled={modalProps.type == "detail"}
                      />
                      <InputComponent
                        name="item"
                        label="Jumlah Laci"
                        type="number"
                        control={
                          modalProps.type == "add" ? control : controlEdit
                        }
                        schema={
                          modalProps.type == "add" ? schemaForm : schemaFormEdit
                        }
                        errors={modalProps.type == "add" ? errors : errorsEdit}
                        disabled={modalProps.type == "detail"}
                      />
                      <SelectComponent
                        name="drawerPosition"
                        label="Posisi Laci"
                        placeholder="Pilih"
                        options={OPTIONS_DRAWER_POSITION}
                        control={
                          modalProps.type == "add" ? control : controlEdit
                        }
                        errors={modalProps.type == "add" ? errors : errorsEdit}
                        schema={
                          modalProps.type == "add" ? schemaForm : schemaFormEdit
                        }
                        disabled={modalProps.type == "detail"}
                      />
                    </div>
                    <CheckboxCustom
                      label="Double Sandaran"
                      name="doubleBackrest"
                      control={modalProps.type == "add" ? control : controlEdit}
                      schema={
                        modalProps.type == "add" ? schemaForm : schemaFormEdit
                      }
                      disabled={modalProps.type == "detail"}
                    />
                    <CheckboxCustom
                      label="Busa"
                      name="foam"
                      control={modalProps.type == "add" ? control : controlEdit}
                      schema={
                        modalProps.type == "add" ? schemaForm : schemaFormEdit
                      }
                      disabled={modalProps.type == "detail"}
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
                disabled={modalProps.type == "detail"}
              />
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:col-span-2 items-self-end border-t py-3 border-gray-500">
                <Button type="submit" disabled={modalProps.type == "detail"}>
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => resetModal()}
                  disabled={modalProps.type == "detail"}
                >
                  Reset
                </Button>
              </div>
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
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WithAuth(Order);
