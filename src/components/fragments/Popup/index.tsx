import productServices from "@/services/product";
import { useEffect, useState } from "react";
import { usePopulationStats } from "@/hook/demografi";

type Props = {
  total: boolean;
  kelamin: boolean;
  kepadatan: boolean;
  usia: boolean;
};

export default function PopUp(prop:Props) {
  const {
    totalPopulation,
    menCount,
    womenCount,
    averageAge,
    populationDensity,
  } = usePopulationStats();

  const { total, kepadatan, kelamin, usia } = prop;

  return (
    <div>
      <div>
        <p className={`${total ? "" : "hidden"}`}>
          Total Penduduk: <span className="text-accent">{totalPopulation}</span> Jiwa
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

