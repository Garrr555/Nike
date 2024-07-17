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
];

export default function AdminLayout(props: PropsType){

    const {children} = props

    return(
        <div>
            <Sidebar lists={listSidebarItem}/>
            {children}
        </div>
    )
}