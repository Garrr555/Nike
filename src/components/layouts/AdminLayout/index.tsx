import Sidebar from "@/components/fragments/Sidebar";
import { url } from "inspector";
import { title } from "process";

type PropsType = {
    children: React.ReactNode
}

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
  // {
  //   title: "Profile",
  //   url: "/admin/profile",
  //   icon: "bxs-group",
  // },
];

export default function AdminLayout(props: PropsType){

    const {children} = props

    return (
      <div className="flex">
        <Sidebar lists={listSidebarItem} role="Admin"/>
        <div className="w-full py-10 px-14">{children}</div>
      </div>
    );
}