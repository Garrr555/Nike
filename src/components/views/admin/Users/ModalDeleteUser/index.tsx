import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

export default function ModalDeleteUser(props:any){

    const {deletedUser, setDeletedUser, setUsersData} = props
    const session:any = useSession()
    console.log(session)

    const handleDelete = async () => {
         userServices.deleteUser(deletedUser.id, session.data?.accessToken);
         setDeletedUser({});
         const { data } = await userServices.getAllUsers();
         setUsersData(data.data);
    }

    return (
      <Modal onClose={() => setDeletedUser({})}>
        <div className="">
          <div className="text-xl font-semibold">Are You Sure?</div>
          <div className="flex justify-start">
            <Button
              variant="bg-red-700 text-sm font-semibold px-3 py-2 w-20"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    );
}