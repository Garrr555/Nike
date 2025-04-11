import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Card from "./card";
import Link from "next/link";

type PropsTypes = {
    products: Product[]
}

export default function ProductView(props: PropsTypes) {
    const {products} = props
  return (
    <div className="container">
      <h1 className="text-xl">All product ({products.length})</h1>
      <div className="mt-5 flex gap-8">
        <div className="w-1/6">
          <div>
            <h4 className="font-semibold my-3">Gender</h4>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex gap-2">
                <input type="checkbox" id="men" className="" />
                <label htmlFor="men">Men</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="women" />
                <label htmlFor="women">Women</label>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="w-5/6 grid grid-cols-3 xl:grid-cols-4 gap-5 ">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
