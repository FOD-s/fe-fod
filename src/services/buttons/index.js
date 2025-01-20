import endpoint from "../endpoint";
import useApi from "@/services/method";

const useButtonService = () => {
    const { GET } = useApi();

    const getButtonPrice = (button,extra) =>
        GET(`${endpoint.buttonPrice}?button=${button}&extra=${extra}`);

    return {
        getButtonPrice,
    };
};

export default useButtonService;