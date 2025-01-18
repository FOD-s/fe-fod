/* eslint-disable no-unused-vars */
import endpoint from "../endpoint";
import useApi from "@/services/method";

const useSelectService = () => {
  const { GET, POST, PUT, PATCH, DELETE, POST_LOGIN } = useApi();

  // GET
  const getDropdownProduct = () => GET(`${endpoint.dropdownProduct}`);
  const getDropdownMaterial = () => GET(`${endpoint.dropdownMaterial}`);
  const getDropdownDrawer = () => GET(`${endpoint.dropdownDrawer}`);
  const getDropdownButton = () => GET(`${endpoint.dropdownButton}`);
  const getDropdownCover = () => GET(`${endpoint.dropdownCover}`);
  const getDropdownSize = (idProduct, type) =>
    GET(`${endpoint.dropdownSize}?idProduct=${idProduct}&type=${type}`);
  const getDropdownTrundleBedSize = (idProduct, backrest) =>
    GET(
      `${endpoint.dropdownTrundleBedSize}?idProduct=${idProduct}&backrest=${backrest}`
    );
  // POST
  // PUT

  // PATCH

  // DELETE

  return {
    getDropdownProduct,
    getDropdownMaterial,
    getDropdownDrawer,
    getDropdownButton,
    getDropdownCover,
    getDropdownSize,
    getDropdownTrundleBedSize,
  };
};

export default useSelectService;
