import productServices from "@/services/product";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: "men" | "women"; 
  status: string; 
  age: number;
}

type Props = {
  total: boolean;
  kelamin: boolean;
  kepadatan: boolean;
  usia: boolean;
};

// Konstanta luas wilayah Desa Margasana dalam km²
const AREA_MARGASANA_KM2 = 3.5;

export default function PopUp(prop:Props) {
  const { total, kepadatan, kelamin, usia } = prop;
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
  const activeProducts = products.filter(
    (product) => product.status === "true"
  );
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
  const populationDensity = Math.round(calculatePopulationDensity(
    totalPopulation,
    AREA_MARGASANA_KM2
  ))

  // Menghitung rata-rata usia penduduk yang statusnya "true"
 const totalAge = activeProducts.reduce(
   (sum, product) => sum + Number(product.age),
   0
 );
  console.log(totalAge)
  const averageAge =
    totalPopulation > 0
      ? Math.round(totalAge / totalPopulation).toFixed(2)
      : "N/A";

  return (
    <div>
      <div>
        <p className={`${total ? "" : "hidden"}`}>
          Total Penduduk: <span className="text-accent">{totalPopulation}</span>
        </p>
        <div className="flex justify-between">
          <p className={`${kelamin ? "" : "hidden"}`}>
            Laki-laki: <span className="text-accent">{menCount}</span>
          </p>
          <p className={`${kelamin ? "" : "hidden"}`}>
            Perempuan: <span className="text-accent">{womenCount}</span>
          </p>
        </div>
        <p className={`${kepadatan ? "" : "hidden"}`}>
          Kepadatan Penduduk:{" "}
          <span className="text-accent">{populationDensity.toFixed(2)}</span>{" "}
          jiwa/km²
        </p>
        <p className={`${usia ? "" : "hidden"}`}>
          Rata-rata Usia: <span className="text-accent">{averageAge}</span>{" "}
          tahun
        </p>
      </div>
    </div>
  );
}
