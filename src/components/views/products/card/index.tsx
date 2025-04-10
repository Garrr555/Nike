import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropsTypes = {
    product: Product
    key: string
}
export default function Card(props: PropsTypes){
    const {product, key} = props
    return (
      <div key={key} className="w-[250px] h-[400px] xl:w-[300px]">
        <div className="w-full h-[300px]">
          <Image
            src={product.image}
            alt={product.name}
            height={300}
            width={300}
            className="w-full h-full"
          />
        </div>
        <div className="my-3 text-sm">
          <p className="font-bold">{product.name}</p>
          <p className="font-light">{product.category}</p>
          <p className="font-light">{convertIDR(product.price)}</p>
        </div>
      </div>
    );
}