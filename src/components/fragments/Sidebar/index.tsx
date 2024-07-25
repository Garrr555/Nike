import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type PropsType ={
    lists: Array<{
        title: string,
        url: string,
        icon: string,
    }>,
    role?: string,
}

export default function Sidebar(props: PropsType){

    const {lists, role} = props
    const {pathname} = useRouter()

    return (
      <div className="bg-dark text-white p-5 w-[300px] h-[100vh] flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-10 text-center">{role} Panel</h1>
          {lists.map((list, index) => (
            <Link
            href={list.url}
              className={`text-lg font-semibold my-3 flex items-center gap-2 rounded-lg p-1 transition-all ease-in-out duration-300 hover:bg-white hover:text-primary cursor-pointer ${pathname === list.url && 'bg-white text-primary'}`}
              key={list.title}
            >
              <i className={` ml-4 text-3xl bx ${list.icon}`} />
              <h2>{list.title}</h2>
            </Link>
          ))}
        </div>

        <div>
            <Button type="button" variant="bg-primary text-white w-60 " onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    );
}