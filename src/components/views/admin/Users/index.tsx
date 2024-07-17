import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";

type PropsType = {
    users: any
}

export default function UserAdminView(props: PropsType){

    const {users} = props
    console.log(users)

    return (
      <AdminLayout>
        <div className="">
          <div className="text-4xl font-bold mb-10">User Management</div>
          <table className="w-full border-spacing-0 border-collapse border border-[#ddd] ">
            <thead className="">
              <tr className="text-xl text-left">
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold pl-2">#</th>
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold">Fullname</th>
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold">Email</th>
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold">Phone</th>
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold">Role</th>
                <th className="py-1 border border-[#ddd] bg-[#ddd] font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index: number) => (
                <tr
                  className="text-md  odd:bg-white even:bg-[#ddd] text-dark font-semibold"
                  key={user.id}
                >
                  <td className="pl-2">{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2 items-center mb-2">
                    <Button type="button" variant="bg-primary w-24">
                      Update
                    </Button>
                    <Button type="button" variant="bg-dark w-24">
                      Deleted
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    );
}