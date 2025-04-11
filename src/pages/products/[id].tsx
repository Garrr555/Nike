'use client'

import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailProductPage() {
  const [product, setProduct] = useState<Product | {}>([]);
  const { id } = useRouter().query;

  useEffect(() => {
    const getDetailProduct = async (id:string) => {
      const { data } = await productServices.getDetailProduct(id);
      setProduct(data.data);
    };
    getDetailProduct(id as string);
  }, [id]);

  console.log(product);
  return (
    <>
      <Head>
        <title>Products Detail</title>
      </Head>
      <DetailProductView product={product} />
    </>
  );
}
