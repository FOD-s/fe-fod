const endpoint = {
  // User
  user: "/users",

  // Admin
  loginAdmin: "/login",
  logoutAdmin: "/logout",
  checkValidateToken: "/check-token",
  authMe: "/auth/me",
  profile: "/profile",
  dropdownProduct: "/dropdown/products",
  dropdownMaterial: "/dropdown/materials",
  dropdownDrawer: "/dropdown/drawers",
  dropdownButton: "/dropdown/buttons",
  dropdownCover:"/dropdown/covers",
  dropdownSize:"/dropdown/sizes",
  dropdownTrundleBedSize:"/dropdown/trundle-bed-sizes",

  // Order
  order: "/orders",

  // Material
  material: "/materials",

  // Cover
  coverPrice: "/covers/price",

  // Button
  buttonPrice: "/buttons/price",
  
  // Drawer
  drawerPrice: "/drawers/price",

  // Backrest
  backrestPrice: "backrests/price",

  // Model
  model: "/models",

  // TrundleBed
  trundleBedPrice: "/trundle-beds/price"
};

export default endpoint;
