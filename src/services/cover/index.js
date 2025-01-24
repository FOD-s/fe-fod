import endpoint from "../endpoint";
import useApi from "@/services/method";

const useCoverPriceService = () => {
  const { GET } = useApi();

  const getCoverPrice = (size, cover) =>
    GET(`${endpoint.coverPrice}?size=${size}&cover=${cover}&`);

  return {
    getCoverPrice,
  };
};

export default useCoverPriceService;
