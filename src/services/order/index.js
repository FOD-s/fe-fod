import endpoint from "../endpoint";
import useApi from "@/services/method";

const useOrderService = () => {
  const { GET, POST, PUT } = useApi();

  const getAllOrder = () => GET(`${endpoint.order}`);
  const getListOrderByUserId = (userId) =>
    GET(`${endpoint.order}/filter?userId=${userId}`);
  const getOrderById = (id) => GET(`${endpoint.order}/${id}`);
  const createOrder = (dataBody) => POST(`${endpoint.order}`, dataBody);
  const approveOrder = (id, dataBody) =>
    PUT(`${endpoint.order}/approve/${id}`, dataBody);
  const reviewOrder = (id, dataBody) =>
    PUT(`${endpoint.order}/review/${id}`, dataBody);
  const updateOrder = (id,dataBody) => PUT (`${endpoint.order}/${id}`,dataBody);

  return {
    getAllOrder,
    getListOrderByUserId,
    createOrder,
    approveOrder,
    reviewOrder,
    getOrderById,
    updateOrder
  };
};

export default useOrderService;
