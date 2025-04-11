import Button from "@/components/ui/button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  product: Product | any;
};

export default function DetailProductView(props: PropTypes) {
  const { product } = props;
  console.log(product);
  return (
    <div className="container">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src={product?.image}
            alt={product?.name}
            height={300}
            width={300}
            className="w-[400px] h-[400px] xl:w-[600px] xl:h-[600px] rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl font-extrabold">{product?.name}</h1>
          <h3 className="text-sm font-extralight text-white/80">
            {product?.category}
          </h3>
          <br />
          <h3 className="text-lg font-bold">{convertIDR(product?.price)}</h3>
          <br />
          <p className="font-light text-sm">Select Size</p>
          <div className="w-full grid grid-cols-3 gap-2 my-3">
            {product?.stock?.map(
              (item: { size: string; qty: number | string }, i: number) => {
                const isDisabled = item.qty === 0 || item.qty === "0";

                return (
                  <div key={i}>
                    {isDisabled ? (
                      <div
                        className="border px-4 py-2 rounded-md text-sm opacity-50
                         cursor-not-allowed select-none flex items-center justify-center min-w-[48px] min-h-[40px]"
                        title="Stok habis"
                      >
                        {item.size}
                      </div>
                    ) : (
                      <>
                        <input
                          type="radio"
                          id={`size-${item.size}`}
                          name="size"
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`size-${item.size}`}
                          className="border border-white/80 px-4 py-2 rounded-md text-sm
                           cursor-pointer select-none flex items-center justify-center
                           peer-checked:border-accent peer-checked:bg-transparent peer-checked:text-accent
                           min-w-[48px] min-h-[40px]"
                        >
                          {item.size}
                        </label>
                      </>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <br />

          <div className="mx-auto">
            <Button
              type="button"
              bgcolor="bg-accent rounded-sm w-full"
              textcolor="text-primary"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
