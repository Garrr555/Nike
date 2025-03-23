"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import productServices from "@/services/product";

ChartJS.register(
  CategoryScale,
  LinearScale,

  LineElement,
  PointElement,

  Title,
  Tooltip,
  Legend
);

type Props = {
  nama: string;
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  age: number;
}

export default function LineChart(props: Props) {
  const { nama } = props;

  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  // Filter hanya penduduk dengan status "true"
  const activeProducts = products.filter(
    (product) => product.status === "true"
  );

  // Ekstrak dan hitung jumlah usia yang sama
  const ageCounts: { [key: number]: number } = {};
  activeProducts.forEach((product) => {
    ageCounts[product.age] = (ageCounts[product.age] || 0) + 1;
  });

  const ages = Object.keys(ageCounts).map(Number); // Label usia unik
  const ageData = Object.values(ageCounts); // Jumlah penduduk untuk setiap usia

  const data = {
    labels: ages,
    datasets: [
      {
        label: "Jumlah Penduduk per Usia",
        data: ageData,
        borderColor: "#00ff99",
        backgroundColor: "rgba(0, 255, 153, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };
  return (
    <div className="w-full bg-secondary shadow-lg rounded-lg p-6 ">
      <h2 className="text-xl font-semibold text-accent text-center mb-4">{`${nama}`}</h2>
      <div className="w-full h-96 mx-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
