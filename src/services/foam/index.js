import endpoint from "../endpoint";
import useApi from "@/services/method";

const useFoamPriceService = () => {
	const { GET } = useApi();

	const getFoamPrice = (idProduct, type) =>
		GET(`${endpoint.foamPrice}?idProduct=${idProduct}&type=${type}`);

	return {
		getFoamPrice,
	};
};

export default useFoamPriceService;
