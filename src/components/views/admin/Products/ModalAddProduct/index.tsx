"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import { useState } from "react";

type PropsType = {
  setModalAddProduct: React.Dispatch<React.SetStateAction<boolean>>
  setProductsData: React.Dispatch<React.SetStateAction<Product[]>>
}


export default function ModalAddProduct(props: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const {setModalAddProduct, setProductsData} = props

  const handleStock = (e:any, i:number, type:string) => {
     const newStockCount:any = [...stockCount];
     newStockCount[i][type] = e.target.value;
     setStockCount(newStockCount);
  }
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="text-2xl text-accent font-semibold">Update User</h1>
      <form onSubmit={() => {}}>
        <div className="my-4">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholderreal="Insert Product Name"
          />
        </div>
        <div className="my-4">
          <Input
            label="Price"
            name="price"
            type="number"
            placeholderreal="xxxxxxxxx"
          />
        </div>

        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={""}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={""}
        />
        <label htmlFor="stock" className="">
          Stock
        </label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div
            key={i}
            className="my-4 flex items-center justify-between gap-3 w-full"
          >
            <div className="w-[50%]">
              <Input
                name="size"
                type="text"
                label="Size"
                placeholderreal="Insert Product Size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
              />
            </div>
            <div className="w-[50%]">
              <Input
                name="qty"
                type="number"
                label="QTY"
                placeholderreal="Insert Product Quantity"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
              />
            </div>
          </div>
        ))}
        <Button
          bgcolor={"bg-accent rounded-full"}
          textcolor={"text-primary"}
          type={"button"}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>
        <div className="flex flex-col">
          <br />
          <label htmlFor="image">Image</label>
          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
          <Button
            bgcolor={"bg-accent rounded-full"}
            textcolor={"text-primary"}
            type={"submit"}
          >
            {isLoading ? "Loading..." : "Add Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
