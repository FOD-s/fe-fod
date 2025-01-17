import endpoint from "../endpoint";
import useApi from "@/services/method";

const useTrundleBedService = () => {
	const { GET } = useApi();

	const getTrundleBedPrice = (idProduct, size, backrest) =>
		GET(
			`${endpoint.trundleBedPrice}?idProduct=${idProduct}&size=${size}&backrest=${backrest}`
		);

	return {
		getTrundleBedPrice,
	};
};

export default useTrundleBedService;
