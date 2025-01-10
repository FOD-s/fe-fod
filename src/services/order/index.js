import endpoint from "../endpoint";
import useApi from "@/services/method";

const useOrderService = () => {
	const { GET } = useApi();

	const getAllOrder = () => GET(`${endpoint.order}`);

	return {
		getAllOrder,
	};
};

export default useOrderService;
