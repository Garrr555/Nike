import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import userServices from "@/services/user";
import MemberLayout from "@/components/layouts/MemberLayout";
import { useSession } from "next-auth/react";
import { convertIDR } from "@/utils/currency";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";

export default function OrdersMemberView() {
  const [profile, setProfile] = useState<any>({});
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const session: any = useSession();

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        console.log(data);
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  const transaction: any = profile?.transaction;
  console.log(transaction);


  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <MemberLayout>
        <div>
          <h1 className="text-accent text-3xl font-semibold mb-2">
            Orders History
          </h1>
          <table className="w-full border-2 border-gray-900">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 font-semibold">No</th>
                <th className="p-2 text-start font-semibold">Order</th>
                <th className="p-2 text-start font-semibold">Total</th>
                <th className="p-2 text-start font-semibold">Status</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((transaction: any, index: number) => (
                <tr
                  key={transaction.order_id}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-primary"}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="py-5">{transaction.order_id}</td>
                  <td>{convertIDR(transaction.total)}</td>
                  <td
                    className={`${
                      transaction.status === "pending" ? "text-red-500" : "text-accent"
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="xl:flex-row flex flex-col items-center justify-center gap-2 py-4">
                    <Button
                      type="button"
                      textcolor="text-secondary text-xl"
                      bgcolor="bg-yellow-400 rounded-lg"
                      onClick={() => setDetailOrder(transaction)}
                    >
                      <BsThreeDotsVertical />
                    </Button>
                    <Button
                      type="button"
                      textcolor="text-secondary text-xl"
                      bgcolor="bg-accent rounded-lg"
                      disabled={transaction.status !== "pending" ? true : false}
                      onClick={() => {
                        window.snap.pay(transaction.token);
                      }}
                    >
                      <FaMoneyBill1Wave />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MemberLayout>
      {Object.keys(detailOrder).length && (
              <ModalDetailOrder
                setDetailOrders={setDetailOrder}
                detailOrders={detailOrder}
                products={products}
              />
            )}
    </>
  );
}
