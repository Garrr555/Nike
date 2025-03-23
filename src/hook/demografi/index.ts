import { useEffect, useState } from "react";
import productServices from "@/services/product";

// Konstanta luas wilayah Desa Margasana dalam km²
const AREA_MARGASANA_KM2 = 3.5;

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  age: number;
}

interface PopulationStats {
  totalPopulation: number;
  menCount: number;
  womenCount: number;
  averageAge: number; 
  populationDensity: number;
}

export function usePopulationStats(): PopulationStats {
  const [stats, setStats] = useState<PopulationStats>({
    totalPopulation: 0,
    menCount: 0,
    womenCount: 0,
    averageAge: 0,
    populationDensity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await productServices.getAllProducts();
        const activeProducts: Product[] = data.data.filter(
          (product: Product) => product.status === "true"
        );

        const menCount = activeProducts.filter(
          (product) => product.category === "men"
        ).length;
        const womenCount = activeProducts.filter(
          (product) => product.category === "women"
        ).length;
        const totalPopulation = activeProducts.length;

        const totalAge = activeProducts.reduce(
          (sum, product) => sum + Number(product.age),
          0
        );
        const averageAge =
          totalPopulation > 0 ? Math.round(totalAge / totalPopulation) : 0;

        const populationDensity =
          totalPopulation > 0
            ? Math.round(totalPopulation / AREA_MARGASANA_KM2)
            : 0;

        setStats({
          totalPopulation,
          menCount,
          womenCount,
          averageAge,
          populationDensity,
        });
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchData();
  }, []);

  return stats;
}
