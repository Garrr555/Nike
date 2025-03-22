import StatAdminView from "@/components/views/admin/stat";
import BarChart from "@/components/views/admin/stat/BarChart";
import LineChart from "@/components/views/admin/stat/LineChart";
import PieChart from "@/components/views/admin/stat/PieChart";
import { Doughnut } from "react-chartjs-2";

//<p> pertumbuhan</p>

export default function AdminStatPage() {
    return (
      <div className="flex flex-wrap justify-start items-center gap-5 p-10">
        <div >
          <LineChart nama="Usia" />
        </div>
        <div>
          <BarChart nama="Jumlah Penduduk" tipe="jumlah"/>
        </div>
        <div>
          <BarChart nama="Jumlah Penduduk" tipe="kepadatan"/>
        </div>
        <div className="">
          <PieChart nama="Jenis Kelamin" />
        </div>

        <div>{/* <Doughnut /> */}</div>
      </div>
    );
}