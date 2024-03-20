import { CiLogin, CiShoppingCart } from "react-icons/ci";
import { RiUserAddLine } from "react-icons/ri";

// Navbar menu links constant
export const NAVBAR_LINKS = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Books",
    path: "/books",
  },
];

// Auth and cart links
export const AUTH_LINKS = [
  {
    icon: <CiLogin size={32} />,
    title: "Login",
    path: "auth/login",
  },
  {
    icon: <RiUserAddLine size={28} />,
    title: "Register",
    path: "/register",
  },
  {
    icon: <CiShoppingCart size={32} />,
    title: "Cart",
    path: "/cart",
  },
];
