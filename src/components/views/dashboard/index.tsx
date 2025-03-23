import dynamic from "next/dynamic";
import Image from "next/image";
import { usePopulationStats } from "@/hook/demografi";

const MapView = dynamic(() => import("@/components/views/map/MapView"), { ssr: false });

export default function DashboardView() {
    const {
      totalPopulation,
      menCount,
      womenCount,
      averageAge,
      populationDensity,
    } = usePopulationStats();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex justify-center items-center">
        {/* Gambar */}
        <Image
          alt="desa"
          src={"/desa/demo.jpg"}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />

        {/* Overlay gradasi atas & bawah */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

        {/* Teks & Logo */}
        <div className="absolute text-white text-center flex flex-col items-center gap-6 px-6 md:px-20">
          <Image
            alt="logo"
            src={"/desa/logo-bms.png"}
            width={120}
            height={120}
          />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Website Demografi Desa <br />
            <span className="text-accent font-extrabold">Margasana</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Website ini menyajikan informasi seputar demografi Desa Margasana,
            termasuk jumlah penduduk, kepadatan, pertumbuhan, serta peta
            interaktif.
          </p>
        </div>
      </div>

      {/* Section Statistik Demografi */}
      <section className="py-16 px-6 md:px-20 text-center bg-primary">
        <h2 className="text-3xl font-bold text-white mb-6">
          Statistik Demografi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-secondary shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold text-white/80">
              Total Penduduk
            </h3>
            <p className="text-2xl font-bold text-accent">{totalPopulation}</p>
          </div>
          <div className="p-6 bg-secondary shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold text-white/80">
              Kepadatan Penduduk
            </h3>
            <p className="text-2xl font-bold text-accent">{populationDensity} Jiwa/km²</p>
          </div>
          <div className="p-6 bg-secondary shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold text-white/80">
              Rata-rata Usia
            </h3>
            <p className="text-2xl font-bold text-accent">{averageAge}</p>
          </div>
        </div>
      </section>

      {/* Section Peta Interaktif */}
      <section className="py-16 px-6 md:px-20 text-center bg-primary">
        <h2 className="text-3xl font-bold texct-white mb-6">
          Peta Interaktif
        </h2>
        <p className="text-lg text-white/80 mb-6">
          Gunakan peta interaktif untuk mengeksplorasi informasi demografi Desa
          Margasana.
        </p>
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-xl overflow-hidden">
          {/* Placeholder untuk peta */}
          <MapView/>
        </div>
      </section>
    </div>
  );
}
