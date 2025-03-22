"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import productServices from "@/services/product";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  nama: string;
  tipe: "jumlah" | "kepadatan";
};

interface Product {
  id: number;
  name: string;
  category: "men" | "women";
  status: string;
  created_at: { seconds: number; nanoseconds: number }; // Format Timestamp
}

// Konstanta luas wilayah Desa Margasana dalam km²
const AREA_MARGASANA_KM2 = 3.5;

export default function BarChart(props: Props) {
  const { nama, tipe } = props;

  const [products, setProducts] = useState<Product[]>([]);

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

  // Menghitung jumlah laki-laki dan perempuan yang memiliki status true
  const totalPopulation = activeProducts.length;

  // Fungsi untuk menghitung kepadatan penduduk
  const calculatePopulationDensity = (
    population: number,
    area: number
  ): number => {
    return area > 0 ? population / area : 0;
  };

  // **Mengelompokkan data berdasarkan tahun input**
  const populationByYear: { [year: string]: number } = {};

  activeProducts.forEach((product) => {
    if (product.created_at && product.created_at.seconds) {
      const date = new Date(product.created_at.seconds * 1000); // Konversi ke Date
      const year = date.getFullYear().toString(); // Ambil Tahun
      populationByYear[year] = (populationByYear[year] || 0) + 1;
    }
  });

  // **Mempersiapkan data untuk chart**
  const years = Object.keys(populationByYear).sort(); // Urutkan tahun secara kronologis
  const populationCounts = years.map((year) => populationByYear[year]);

  // Menghitung kepadatan penduduk per tahun
  const densityByYear: { [year: string]: number } = {};

  Object.keys(populationByYear).forEach((year) => {
    densityByYear[year] = populationByYear[year] / AREA_MARGASANA_KM2;
  });

  // **Data untuk chart**
  const years2 = Object.keys(densityByYear).sort(); // Urutkan tahun secara kronologis
  const populationDensities = years.map((year) => densityByYear[year]); // Ambil kepadatan

  const colors = [
    "#e11d48",
    "#14b8a6",
    "#a855f7",
    "#4ade80",
    "#ec4899",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#facc15",
    "#f97316",
    "#ef4444",
    "#3b82f6",
  ];

  const colors2 = [
    "#3b82f6",
    "#ef4444",
    "#f97316",
    "#facc15",
    "#10b981",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#4ade80",
    "#a855f7",
    "#14b8a6",
    "#e11d48",
  ];

  // Menentukan warna dinamis berdasarkan jumlah tahun yang ada
  const barColors = years.map((_, index) => colors[index % colors.length]);
  const barColors2 = years2.map((_, index) => colors2[index % colors2.length]);

  const data = {
    labels: tipe === "jumlah" ? years : years2, // Tahun sebagai label
    datasets: [
      {
        label: tipe === "jumlah" ? "Jumlah" : "Kepadatan",
        data: tipe === "jumlah" ? populationCounts : populationDensities,
        backgroundColor:
          tipe === "jumlah" ? barColors : barColors2,
      },
    ],
  };

  // Opsi untuk mengatur ukuran chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <AdminLayout>
      <div className="">
        <div className="bg-secondary shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold text-accent text-center mb-4">{`${nama}`}</h2>
          <div className="w-96 h-96 mx-auto">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
