import endpoint from "../endpoint";
import useApi from "@/services/method";

const useDrawerPriceService = () => {
	const { GET } = useApi();

	const getDrawerPrice = (drawer) =>
		GET(`${endpoint.drawerPrice}?drawer=${drawer}&`);

	return {
		getDrawerPrice,
	};
};

export default useDrawerPriceService;
