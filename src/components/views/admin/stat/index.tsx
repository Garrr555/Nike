import AdminLayout from "@/components/layouts/AdminLayout";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function StatAdminView(){
   return (
     <AdminLayout>
       <div className="flex flex-col justify-center items-start gap-5">
         <div className="w-full">
           <LineChart nama="Usia Penduduk" />
         </div>
         <div className="w-full">
           <BarChart nama="Jumlah Penduduk" tipe="jumlah" />
         </div>
         <div className="w-full">
           <BarChart nama="Kepadatan Penduduk (jiwa/km²)" tipe="kepadatan" />
         </div>
         <div className="w-full">
           <PieChart nama="Jenis Kelamin" />
         </div>

         <div>{/* <Doughnut /> */}</div>
       </div>
     </AdminLayout>
   );
}