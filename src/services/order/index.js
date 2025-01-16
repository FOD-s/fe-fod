import endpoint from "../endpoint";
import useApi from "@/services/method";

const useOrderService = () => {
	const { GET, POST,PUT } = useApi();

	const getAllOrder = () => GET(`${endpoint.order}`);
	const createOrder = (dataBody) => POST(`${endpoint.order}`, dataBody);
	const approveOrder = (id,dataBody) => PUT(`${endpoint.order}/approve/${id}`, dataBody);
	const reviewOrder = (id,dataBody) => PUT(`${endpoint.order}/review/${id}`,dataBody)

	return {
		getAllOrder,
		createOrder,
		approveOrder,
		reviewOrder
	};
};

export default useOrderService;
