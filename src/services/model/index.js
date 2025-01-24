import endpoint from "../endpoint";
import useApi from "@/services/method";

const useModelPriceService = () => {
	const { GET } = useApi();

	const getModelPrice = (idProduct,size,type) => GET(`${endpoint.model}?idProduct=${idProduct}&size=${size}&type=${type}&`);

	return {
		getModelPrice,
	};
};

export default useModelPriceService;
