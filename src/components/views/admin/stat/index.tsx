'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function StatAdminView(){
  const [waktu, setWaktu] = useState(false)
  function toogleWaktu(){
    setWaktu(!waktu)
  }
   return (
     <AdminLayout>
       <div className="flex flex-col justify-center items-start gap-5">
         <div className="w-full flex justify-end items-center">
           <Button
             type="button"
             bgcolor="bg-accent rounded-xl"
             textcolor="text-primary"
             onClick={toogleWaktu}
           >{`${waktu ? "Day" : "Year"}`}</Button>
         </div>
         <div className="w-full">
           <LineChart
             nama="Pertumbuhan Penduduk"
             tipe="pertumbuhan"
             waktu={waktu}
           />
         </div>
         <div className="w-full">
           <LineChart nama="Usia Penduduk" tipe="usia" waktu={waktu} />
         </div>
         <div className="w-full">
           <BarChart nama="Jumlah Penduduk" tipe="jumlah" waktu={waktu} />
         </div>
         <div className="w-full">
           <BarChart
             nama="Kepadatan Penduduk (jiwa/km²)"
             tipe="kepadatan"
             waktu={waktu}
           />
         </div>
         <div className="w-full">
           <PieChart nama="Jenis Kelamin" />
         </div>

         <div>{/* <Doughnut /> */}</div>
       </div>
     </AdminLayout>
   );
}