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
  const getDropdownSize = () => GET(`${endpoint.dropdownSize}`);
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
    getDropdownSize
  };
};

export default useSelectService;
