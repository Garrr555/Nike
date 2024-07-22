import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";

export default function ModalUpdateUser(props: any) {
  const { updatedUser, setUpdatedUser } = props;

  return (
    <div>
      <Modal onClose={() => setUpdatedUser({})}>
        <h1 className="text-3xl font-bold">
          Update <span>{updatedUser.fullname}</span>
        </h1>
        <form action="">
          <div className="my-5 text-dark">
            <p className="text-md font-semibold mb-2">Email</p>
            <div className="ml-3">
              <Input
                label=""
                name="email"
                type="email"
                placeholder="Email"
                visible={false}
                handleVisible=""
                defaultValue={updatedUser.email}
                disable
              />
            </div>
          </div>
          <div className="my-5 text-dark">
            <p className="text-md font-semibold mb-2">Fullname</p>
            <div className="ml-3">
              <Input
                label=""
                name="fullname"
                type="text"
                placeholder="Fullname"
                visible={false}
                handleVisible=""
                defaultValue={updatedUser.fullname}
                disable
              />
            </div>
          </div>
          <div className="my-5 text-dark">
            <p className="text-md font-semibold mb-2">Phone</p>
            <div className="ml-3">
              <Input
                label=""
                name="phone"
                type="text"
                placeholder="-"
                visible={false}
                handleVisible=""
                defaultValue={updatedUser.phone}
                disable
              />
            </div>
          </div>
          <label htmlFor="role" className="text-dark text-md font-semibold ">
            Role
          </label>
          <div className="ml-3 -mt-3 font-semibold">
            <Select
              name="role"
              defaultValue={updatedUser.role}
              options={[
                { label: "Member", value: "member" },
                { label: "Admin", value: "admin" },
              ]}
            ></Select>
          </div>
          <div className=" flex justify-end items-center">
            <Button type="submit" variant="bg-dark ">
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
