import endpoint from "../endpoint";
import useApi from "@/services/method";

const useOrderService = () => {
	const { GET, POST } = useApi();

	const getAllOrder = () => GET(`${endpoint.order}`);
	const createOrder = (dataBody) => POST(`${endpoint.order}`, dataBody);

	return {
		getAllOrder,
		createOrder,
	};
};

export default useOrderService;
