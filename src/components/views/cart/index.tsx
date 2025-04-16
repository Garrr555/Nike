import Input from "@/components/ui/input";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  cart: any;
  products: Product[];
};

export default function CartView(props: PropTypes) {
  const { cart, products } = props;
  console.log(cart);
  console.log(products);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => product.id === id);

    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    console.log(options)
    return options;
  };

  return (
    <div className="w-full flex gap-1 justify-center">
      <div className="w-4/6 px-2">
        <h1 className="text-3xl font-extrabold mb-5">Cart</h1>
        <div>
          {cart.map((item: { id: string; size: string; qty: number }) => (
            <div key={`${item.id}-${item.size}`}>
              <div className="flex items-start w-full justify-between bg-secondary rounded-xl overflow-hidden">
                <div className="w-full flex gap-5">
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    width={150}
                    height={150}
                    alt={`${item.id}-${item.size}`}
                  />
                  <div className="py-2 w-full">
                    <p className="text-lg font-bold">
                      {getProduct(item.id)?.name}
                    </p>
                    <p className="text-md font-light">
                      {getProduct(item.id)?.category}
                    </p>
                    
                    <div className="flex items-center gap-5">
                      <label className="text-md font-light flex items-center gap-2">
                        size
                        <Select
                          name="size"
                          options={[{ label: item.size, value: item.size }]}
                        ></Select>
                      </label>
                      <label className="text-md font-light flex items-center gap-2">
                        Quantity
                        <Input name="qty" type="number" className="w-[70px]" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-lg text-accent p-2">
                  {convertIDR(getProduct(item.id)?.price)}
                </div>
              </div>
              <div className="my-5 ">
                <hr className="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/6 sticky h-fit top-20">
        <h1 className="text-3xl font-extrabold mb-5">Summary</h1>
        <div className="bg-secondary h-[300px] p-2">tes Page</div>
      </div>
    </div>
  );
}
