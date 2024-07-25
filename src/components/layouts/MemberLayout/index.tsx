import Sidebar from "@/components/fragments/Sidebar";
import { url } from "inspector";
import { title } from "process";

type PropsType = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Order",
    url: "/member/order",
    icon: "bxs-box",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-group",
  },
];

export default function MemberLayout(props: PropsType) {
  const { children } = props;

  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full py-10 px-14">{children}</div>
    </div>
  );
}
