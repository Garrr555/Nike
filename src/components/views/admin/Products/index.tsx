"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropsType = {
  products: Product[];
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

interface User {
  fullname: string;
  email: string;
  phone: string;
  role: string;
}

export default function ProductsAdminView(props: PropsType) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const { products, setToaster } = props;
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});
  console.log(productsData);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div>
          <div className="my-5 flex justify-between items-center">
            <h1 className="text-accent text-3xl font-semibold mb-2">
              Product Management
            </h1>
            <Button
              type="button"
              textcolor="text-primary"
              bgcolor="bg-accent rounded-xl"
              onClick={() => setModalAddProduct(true)}
              icon={<FaPlus />}
            >
              {" "}
              Add Product
            </Button>
          </div>
          <table className="w-full border-2 border-gray-900">
            <thead>
              <tr className="bg-gray-900 ">
                <th
                  className="p-2 font-semibold border-r-2 border border-gray-800"
                  rowSpan={2}
                >
                  No
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Image
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Category
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  rowSpan={2}
                >
                  Price
                </th>
                <th
                  className="p-2 font-semibold border-x-2 border border-gray-800"
                  colSpan={2}
                >
                  Stock
                </th>
                <th
                  className="p-2 font-semibold border-l-2 border border-gray-800"
                  rowSpan={2}
                >
                  Action
                </th>
              </tr>
              <tr className="bg-gray-900">
                <th className="p-2 font-semibold border-x-2 border border-gray-800">
                  Size
                </th>
                <th className="p-2 font-semibold border-x-2 border border-gray-800">
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: any, index: number) => (
                <>
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-800" : "bg-primary"}
                  >
                    <td className="text-center" rowSpan={product.stock.length}>
                      {index + 1}
                    </td>
                    <td className="py-5" rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={100}
                        width={100}
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length} className="text-center">
                      {convertIDR(product.price)}
                    </td>
                    <td className="text-center">{product.stock[0].size}</td>
                    <td className="text-center">{product.stock[0].qty}</td>
                    <td className=" " rowSpan={product.stock.length}>
                      <div className="xl:flex-row flex flex-col items-center justify-center gap-2">
                        <Button
                          type="button"
                          textcolor="text-primary text-xl"
                          bgcolor="bg-accent"
                          onClick={() => {
                            setUpdatedProduct(product);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          type="button"
                          textcolor="text-white/80 text-xl"
                          bgcolor="bg-red-500"
                          onClick={() => setDeletedProduct(product)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: string }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr
                            className={
                              index % 2 === 0 ? "bg-gray-800" : "bg-primary"
                            }
                            key={index}
                          >
                            <td className="text-center">{stock.size}</td>
                            <td className="text-center">{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
        />
      )}

      {Object.keys(updatedProduct).length && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}

      {Object.keys(deletedProduct).length && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          // setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
}
