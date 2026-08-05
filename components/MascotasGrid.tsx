"use client";

import { useMemo, useState } from "react";
import MascotaCard from "./MascotaCard";

interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  imagen: string;
  descripcion: string;
}

export default function MascotasGrid({
  mascotas,
}: {
  mascotas: Mascota[];
}) {
  const [busqueda, setBusqueda] = useState("");

  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter((mascota) => {
      const texto = busqueda.toLowerCase();

      return (
        mascota.nombre
          .toLowerCase()
          .includes(texto) ||
        mascota.raza
          .toLowerCase()
          .includes(texto)
      );
    });
  }, [busqueda, mascotas]);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          🔍 Buscar mascota
        </label>

        <input
          type="text"
          placeholder="Buscar por nombre o raza..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-black"
        />
      </div>

      <p className="text-gray-600 mb-6">
        Resultados encontrados:
        <strong>
          {" "}
          {mascotasFiltradas.length}
        </strong>
      </p>

      {mascotasFiltradas.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
          <p className="text-gray-600">
            No se encontraron mascotas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mascotasFiltradas.map(
            (mascota) => (
              <MascotaCard
                key={mascota.id}
                mascota={mascota}
              />
            )
          )}
        </div>
      )}
    </>
  );
}
