import endpoint from "../endpoint";
import useApi from "@/services/method";

const useBackrestPriceService = () => {
	const { GET } = useApi();

	const getBackrestPrice = (material) =>
		GET(`${endpoint.backrestPrice}?material=${material}&`);

	return {
		getBackrestPrice,
	};
};

export default useBackrestPriceService;
