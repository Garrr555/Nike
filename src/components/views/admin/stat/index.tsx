'use client'

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

// Registrasi elemen yang diperlukan di Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  nama: string,

}

export default function StatAdminView(props:Props) {
  const {nama} = props
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220, 280],
        borderColor: "#00ff99", // Warna biru dari Tailwind
        backgroundColor: "#00ff99",
        tension: 0.3, // Membuat garis lebih halus
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
    <>
      <AdminLayout>
        <div className="bg-primary p-5 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold text-accent mb-3">
            {nama} Penduduk
          </h2>
          <Line data={data} options={options} />
        </div>
      </AdminLayout>
    </>
  );
}