'use client'

import { TiHome } from "react-icons/ti";
import { RiCustomerService2Fill, RiRobot3Fill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import {
  FaUserEdit,
  FaUserCog,
  FaUserCircle,
  FaMapMarkedAlt,
  FaBoxes,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const links = [
  {
    name: "home",
    path: "/",
    logo: TiHome,
  },
  {
    name: "Map",
    path: "/map",
    logo: FaMapMarkedAlt,
  },
  {
    name: "AI",
    path: "/ai",
    logo: RiRobot3Fill,
  },
  {
    name: "Product",
    path: "/products",
    logo: FaBoxes,
  },

  {
    name: "Admin",
    path: "/admin",
    logo: FaUserCog,
  },
];

export default links;
