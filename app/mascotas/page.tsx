"use client";

import { useState } from "react";
import MascotaCard from "@/components/MascotaCard";
import SearchBar from "@/components/SearchBar";
import { mascotas } from "@/data/mascotas";

export default function MascotasPage() {
  const [busqueda, setBusqueda] = useState("");

  const mascotasFiltradas = mascotas.filter((mascota) =>
    mascota.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Mascotas Disponibles
      </h1>

      <SearchBar
        valor={busqueda}
        onChange={setBusqueda}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotasFiltradas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
          />
        ))}
      </div>
    </main>
  );
}