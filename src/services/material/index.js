import endpoint from "../endpoint";
import useApi from "@/services/method";

const useMaterialService = () => {
    const { GET } = useApi();

    const getMaterialPrice = (idProduct,type,material) => GET(`${endpoint.material}/price?idProduct=${idProduct}&type=${type}&material=${material}&`);

    return {
        getMaterialPrice,
    };
};

export default useMaterialService;