import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function StatAdminView(){
   return (
        <div className="flex flex-wrap justify-start items-center gap-5 p-10">
          <div >
            <LineChart nama="Usia Penduduk" />
          </div>
          <div>
            <BarChart nama="Jumlah Penduduk" tipe="jumlah"/>
          </div>
          <div>
            <BarChart nama="Kepadatan Penduduk" tipe="kepadatan"/>
          </div>
          <div className="">
            <PieChart nama="Jenis Kelamin" />
          </div>
  
          <div>{/* <Doughnut /> */}</div>
        </div>
      );
}