"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
}

export default function MisMascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useEffect(() => {
    async function cargarMascotas() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("refugio_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setMascotas(data);
      }
    }

    cargarMascotas();
  }, []);

  async function eliminarMascota(id: number) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta mascota?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("mascotas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setMascotas(
      mascotas.filter((mascota) => mascota.id !== id)
    );

    alert("Mascota eliminada correctamente");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Mis Mascotas
      </h1>

      <div className="space-y-4">
        {mascotas.map((mascota) => (
          <div
            key={mascota.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-black">
                {mascota.nombre}
              </h2>

              <p className="text-gray-600">
                {mascota.raza}
              </p>
            </div>

            <div className="flex gap-2">
              <Link href={`/dashboard/editar-mascota/${mascota.id}`} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Editar
              </Link>

              <button
                onClick={() =>
                  eliminarMascota(mascota.id)
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}