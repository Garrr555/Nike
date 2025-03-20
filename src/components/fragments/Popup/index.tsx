import productServices from "@/services/product";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: "men" | "women"; // Hanya bisa bernilai "men" atau "women"
  status: string; // Status aktif atau tidak
}

// Konstanta luas wilayah Desa Margasana dalam km²
const AREA_MARGASANA_KM2 = 3.5;

export default function PopUp() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log("products: ", products);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  // Filter hanya penduduk dengan status true
  const activeProducts = products.filter((product) => product.status === "true");
  console.log("activeProducts: ", activeProducts);

  // Menghitung jumlah laki-laki dan perempuan yang memiliki status true
  const menCount = activeProducts.filter(
    (product) => product.category === "men"
  ).length;
  const womenCount = activeProducts.filter(
    (product) => product.category === "women"
  ).length;
  const totalPopulation = activeProducts.length;

  // Fungsi untuk menghitung kepadatan penduduk
  const calculatePopulationDensity = (
    population: number,
    area: number
  ): number => {
    return area > 0 ? population / area : 0;
  };

  // Kepadatan penduduk di Desa Margasana
  const populationDensity = calculatePopulationDensity(
    totalPopulation,
    AREA_MARGASANA_KM2
  );

  return (
    <div>
      <div>
        <p>Total Penduduk: {totalPopulation}</p>
        <p>Laki-laki: {menCount}</p>
        <p>Perempuan: {womenCount}</p>
        <p>Kepadatan Penduduk: {populationDensity.toFixed(2)} jiwa/km²</p>
      </div>
    </div>
  );
}
